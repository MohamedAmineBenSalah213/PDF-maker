// import styles from './fill-pdf.component.css';
import { AfterViewInit, Component,Renderer2 , ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { DefaultValueAccessor } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { degrees, PDFDocument,PDFAnnotation,PDFFont, rgb, PDFWidgetAnnotation, PDFName, PDFString, grayscale } from 'pdf-lib';
import { InteractionService } from '../Services/interaction.service';
import { HttpClient } from '@angular/common/http';

import interact from 'interactjs';
import { PdfViewerComponent } from 'ng2-pdf-viewer';

import $ from 'jquery';
import { Subscription } from 'rxjs';

enum TextFieldDefaultValues {
  EMAIL ,
  DATE_OF_BIRTH ,
  FULL_NAME ,
  FIRST_NAME ,
  LAST_NAME ,
  CURRENT_TIME,
  PHONE
}
enum DropdownDefaultValues {
  GENDER ,
  COUNTRIES ,
  WEEKDAYS ,
  MONTHS
}
enum Default_Validators {
  MIN,
  MAX,
  REQUIRED,
  REQUIRED_TRUE,
  EMAIL,
  MIN_LENGTH,
  MAX_LENGTH,
  PATTERN,
}
@Component({
  selector: 'app-fill-pdf',
  templateUrl: './fill-pdf.component.html',
  styleUrls: ['./fill-pdf.component.css'],
})
export class FillPdfComponent implements OnInit,AfterViewInit {
  private defaultCounter = 1;
  fieldData: any;
  @ViewChild(PdfViewerComponent) pdfViewer: PdfViewerComponent;
  pdfDoc: any;
  pdfSrc: string = 'assets/contrat.pdf'
  src: string = 'assets/contrat.pdf';
  //@Input() src: string | undefined;
  @ViewChild('labelContainer') labelContainer!:ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;
  pdfBytes: any;
  pdfForm: any;
  pdfZoom:number=1;
  fields
  pageNum:number
  height_
  width_
  fromLeft
  fromTop
  defaultValue
  fieldName

  @ViewChild('componentRef', { static: true }) componentRef: ElementRef;
  constructor(
    private interactService: InteractionService,
    public dialog: MatDialog,
    private http:HttpClient,
    private renderer: Renderer2,
 
    ) { }
    // Test Drag-Drop to know x and  y axes
    handleFieldData(data: any,event: MouseEvent) {
      
      if (data) {
        
        this.onViewerMouseDown(event);
        const defaultValue = `default${this.defaultCounter++}`;
        data.left=80.5999984741211;
        data.top=50.5999984741211;
 
        // data.top=942-462.5999984741211;
        // data.left=332-30.5999984741211;
      console.log('Field Data:', data);
      //debugger
      this.createTextField(defaultValue,"",data.top,data.left,250,30,0);
      this.fieldData = data;
      this.updatePdf();       
      }
      else{
        console.log("error");
      }
    }
    
  ngAfterViewInit(): void {
// Access the native HTML element
const element = this.componentRef.nativeElement // Replace with the actual selector


if (element) {
  this.renderer.listen(element, 'mousedown', (event: MouseEvent) => {
    // Handle the mousedown event here
    const x = event.clientX; // X-coordinate relative to the viewport
    const y = event.clientY; // Y-coordinate relative to the viewport

    // Do something with the coordinates
    console.log(`Mouse down within viewer at X: ${x}, Y: ${y}`);
  })
  
  }
}
  async ngOnInit() {
    this.interactService.init();
   
    this.src = 'assets/contrat.pdf';
    await this.loadPdf(this.src);
    this.pdfForm = await this.loadForm();
    await this.getFields();
    // this.fillTextField('Given Name Text Box', 'GUIRAT');
    this.createTextField(
      'Nom Signataire 1 ',
      '1',
      295.1173828125,
      340.20750000000004,
      248,
      93,
      0);
    this.createTextField('Nom Signataire 2 ', '2', 74.6698828125, 470.88, 526 , 30,0);
    this.createTextField('Nom Signataire 3 ', '3', 415.8148828125, 690.33, 200 , 37,0);
   

    // this.createTextField('Nom Signataire 2 ', '2', 320, 403.2, 211*0.75 , 25*0.75,0);
    // this.createTextField('Nom Signataire 3 ', '3', 319, 455, 211*0.75 , 25*0.75,0);
    // this.fillCheckBox("test checkbox", "fieldInput")
   const x = document.getElementById('pdfCanvas');

    if (x) {
      // Get the width and height of the element
      const width = x.offsetWidth;
      const height = x.offsetHeight;
    
      // Get the position of the element relative to its offset parent
      const top = x.offsetTop;
      const left = x.offsetLeft;
    
      console.log(`Width: ${width}px, Height: ${height}px`);
      console.log(`Top: ${top}px, Left: ${left}px`);
    }
  }
load(src){
 this.src = src
}
  async loadPdf(src) {
    // These should be Uint8Arrays or ArrayBuffers
    // This data can be obtained in a number of different ways
    // If your running in a Node environment, you could use fs.readFile()
    // In the browser, you could make a fetch() call and use res.arrayBuffer()
    const arrayBuffer = await fetch(src).then((res) => res.arrayBuffer());
    this.pdfBytes = arrayBuffer;
    this.pdfDoc = await PDFDocument.load(arrayBuffer);
  }
  async loadForm() {
    const form = await this.pdfDoc.getForm();
    return form;
  }
  async getFields() {
    const fields = await this.pdfForm.getFields();
    this.fields = []
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      console.warn(`${type}: ${name}`);
      this.fields.push({type,name})
    });
  }
  fillTextField(fieldName, fieldInput) {
    // Get field in the PDF by name
    var temp = this.pdfForm.getTextField(fieldName);
    console.log(temp);
    // Fill in the basic info fields
    var tempfill = temp.setText(fieldInput);
    console.log(temp);
  }
  async fetchImageAsArrayBuffer(imageUrl: string): Promise<ArrayBuffer> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
    }
    return await response.arrayBuffer();
  } 
  fillStamp(url:string){
  try {
    const jpgUrl = url;
    console.log(jpgUrl);

    // Check if this.pdfDoc is defined and has the getPages method
    if (this.pdfDoc && typeof this.pdfDoc.getPages === 'function') {
      const pages = this.pdfDoc.getPages();

      // Check if there is at least one page in the document
      if (pages.length > 0) {
        debugger
        // Ensure jpgUrl is a valid SVG path string
        if (typeof (jpgUrl) === 'string') {
          const path = 'M 82.675,98.200 C 85.987,105.218 83.875,101.800'
          pages[0].drawSvgPath(path,{ x: 25, y: 75 });
          // pages[0].drawSvgPath(jpgUrl?.toString());

          // Update PDF and perform other actions if needed
          this.getFields();
          this.updatePdf();
        } else {
          console.error('jpgUrl is not a valid SVG path string.');
        }
      } else {
        console.error('No pages found in the PDF document.');
      }
    } else {
      console.error('this.pdfDoc is not properly initialized.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
    }
    async  drawSvgPaths(data:string) {
      // Decode the base64 data and convert it to an SVG string
      const decodedData = data
    
    /*   const form = this.pdfDoc.getForm();
    const pages = this.pdfDoc.getPages();
      pages[0].drawSvgPath(data.toString()) */
      const imgElement = document.createElement("img");

     // Set the src attribute to your Base64 string
     imgElement.src = data;  

    // Append the img element to a container div
    const imageContainer = document.getElementById("image");
    imageContainer.appendChild(imgElement);
    const pages = this.pdfDoc.getPages();
    pages[0].drawSvgPath(imageContainer.getAttribute("src"))
      return data;

    } 

    // Usage:
  // Replace with your Base64 SVG data

  signature=false;
  signatureField(){
  this.signature=true;
  }
  fillButton  (fieldName) {
    const form = this.pdfDoc.getForm();
    const pages = this.pdfDoc.getPages();
    const button = form.createButton(fieldName)
    const { width, height } =pages[0].getSize();
     button.addToPage(fieldName, pages[0], {
      x: 150,
      y: 75,
      width: 200,
      height: 100,
      textColor: rgb(1, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 2,
      rotate: degrees(90),
    
    }) 
    this.getFields();
 
    this.updatePdf()
  }
  fillCheckBox(fieldName,left,top) {
    const form = this.pdfDoc.getForm();
    const pages = this.pdfDoc.getPages();
    const checkBox = form.createCheckBox(fieldName)
    const { width, height } =pages[0].getSize();
     checkBox.addToPage(pages[0], {
      x:left,
      y:top,
      width: 15,
      height: 15,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(0, 1, 0),
      borderColor: rgb(0, 0, 1),
      borderWidth: 1,
      rotate: degrees(0),
    }) 
    this.getFields();
 
    this.updatePdf()
  }
 
 

  async getPage(pageNum){
    // const [page] = await this.pdfDoc.embedPdf(this.pdfBytes, [pageNum-1])
    // console.log([page]);
    // return page

  }
  insertCanvasIntoTextWidget(canvasData: string) {
    // Create an img element with the canvas data
    console.log("sdfdfs"+canvasData)
    this.fillStamp(canvasData)
    //this.drawSvgPaths(canvasData)
    
  }
  
  async createTextField(fieldName, defaultValue, fromTop, fromLeft, width_, height_,pageNum) {
    const pages = this.pdfDoc.getPages()
     const { width, height } =pages[pageNum].getSize();
      const form = this.pdfDoc.getForm();
      const textField = form.createTextField(fieldName);
      textField.setText(defaultValue);
      
     // textField.enableMultiline();
      const borderWidth = 1;
      textField.addToPage(pages[pageNum], {
        x: fromLeft,
        y:  fromTop,
        width: width_,
        height: height_,
        textColor: rgb(0, 0, 0),
        backgroundColor: rgb(1, 1, 1),
        borderColor: rgb(0, 0, 0),
        borderWidth: borderWidth,
        rotate: degrees(0),
      })
     textField.setFontSize(40);
      }
    async savePdf() {
    //  `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
    // Serialize the PDFDocument to bytes (a Uint8Array)

    this.pdfBytes = await this.pdfDoc.save();
    let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    this.src = fileURL
    console.log(fileURL);
     this.openFileInNewTab(fileURL);
    
  }
  openFileInNewTab(fileURL) {
    window.open(fileURL);
  }
async updatePdf(){
  this.pdfBytes = await this.pdfDoc.save();
this.pdfBytes = await this.pdfDoc.save();
let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
var fileURL = URL.createObjectURL(file);
this.src = fileURL

}

getFieldValue(){
this.fields.forEach(element => {
  if(element.type=="PDFTextField"){
    const textField = this.pdfForm.getTextField(element.name)
    const text = textField.getText()
    console.log('Text field contents:', text)
  }});
}

 
 
  mouseY: number = 0;
  startX: number | undefined;
  startY: number | undefined;
  endX: number | undefined;
  endY: number | undefined;
  
x=0;
y=0;
// Select Input
editFieldName(field: any): void {
  field.editing = true;
  console.log(field.name);
  const annotationLayers = document.querySelectorAll('.annotationLayer');
  annotationLayers.forEach((annotationLayer) => {
    // Access and manipulate child elements within each "annotationLayer"
    const inputFields = annotationLayer.querySelectorAll('input');

    inputFields.forEach((inputField) => {
      if(inputField.name===field.name){
      // Do something with each input field, for example, focus on it
      inputField.focus();
      }
    });
  });
}

saveFieldName(field: any): void {
  field.editing = false;
}
//Click Text Field Button
textFieldsettings=false 
  AddTextField(){
this.textFieldsettings=true
console.log(this.textFieldsettings);
  }
//Click text Button
disableMouseDown = false;   
onClickTextButton(): void {
  this.disableMouseDown = true;
}
// Click CheckBox

checkBoxsettings=false
addcheckbox(){
   this.checkBoxsettings=true;
 }
//Click Stamp Button
 Stampsettings=false
 onClickStampButton(){
  this.Stampsettings=true
 }
 // Upload  Image accept .png
 selectedFile: File | null = null;

 onFileSelected(event: Event): void {
   const inputElement = event.target as HTMLInputElement;
   if (inputElement.files && inputElement.files.length > 0) {
    
     this.selectedFile = inputElement.files[0];
     
    if (this.selectedFile) {
      this.readFileAsArrayBuffer(this.selectedFile);
    }
   }
 }

  async fillImage(srcImage,x,y){
  const form = this.pdfDoc.getForm();
  const pages = this.pdfDoc.getPages();
  const pngUrl = srcImage
  
  // Fetch the image data and convert it to a Uint8Array
//   debugger
// const response = await fetch(pngUrl);
// const arrayBuffer = await response.arrayBuffer();
// const pngImageBytes = new Uint8Array(arrayBuffer);

// Embed the image as a PDFImage
const emptyImage = await this.pdfDoc.embedPng(this.imageBuffer);

  // Calculate the image position
  const imageX = 200; // X-coordinate of the image
  const imageY = 200; // Y-coordinate of the image

  // Add the empty image to the page
  pages[0].drawImage(emptyImage, {
    x: x,
    y: y,
    height:30,
    width:100,
    rotate: degrees(0), // Optional rotation
  });

}
//    mousedown pdf-viewer
onViewerMouseDown(event: MouseEvent): void {
  const canvas: HTMLCanvasElement = <HTMLCanvasElement>(
    document.getElementById('pdfCanvas')
  );
  const rect = canvas.getBoundingClientRect();
  
  // Calculate X from the left-bottom corner
  const x = event.clientX - rect.x -280;
  
  // Calculate Y from the left-bottom corner
  const y = 816 - (event.clientY - rect.y);

  console.log(`Mouse down at X: ${x}, Y: ${y}`);
  const target = event.target as HTMLElement;


  // Iterate through the elements with class "page"
  const pages = Array.from(document.querySelectorAll('.page'));

  // Iterate through the elements with class "page"
  pages.forEach((page: HTMLElement) => {
    if (page === target && page.hasAttribute('data-page-number')) {
      // The clicked element is the one with the data-page-number attribute
      const pageNumber = page.getAttribute('data-page-number');
      console.log('Clicked element has data-page-number with class "page".');
      console.log('Page Number:', pageNumber);
      // You can use the pageNumber variable to access the value of data-page-number.
    }
    else{
      console.log("errror");
      
    }
  });
  //Text Field button
  if (!this.disableMouseDown) {
   
  }else{
    
    const defaultValue = `default${this.defaultCounter++}`;
  
  this.createTextField(defaultValue,"", y, x, 250, 30, 0);
  this.updatePdf();
  this.getFields();
  this.changeclass();
  this.disableMouseDown=false
  
  console.log(this.checkBoxsettings)
  }
  //CheckBox Button
  if(!this.checkBoxsettings){
  }
  else{
   
    const defaultValuecheckbox = `defaultcheckbox ${this.defaultCounter++}`;
    this.fillCheckBox(defaultValuecheckbox,x,y)
    this.updatePdf();
    this.changeclass();
    this.checkBoxsettings=false
  }
  //Stamp Button
  if(!this.Stampsettings){
  }
  else{
    const defaultValueStamp = `defaultStamp ${this.defaultCounter++}`;
    this.drawImage()
   // this.createTextField(defaultValueStamp,'',x,y,250,250,0);
   debugger
   this.fillImage(this.selectedFile.name,x,y)
    this.updatePdf();
    this.changeclass();
    this.Stampsettings=false;
  }
  
  
}


changeclass(){
    const selectElements = document.getElementsByTagName('section');
    console.log(selectElements);
            for (let i = 0; i < selectElements.length; i++) {
                selectElements[i].classList.add("drag-drop");
          
  }
 
}

// Json reading

  // 1 Drag and drop
  // 2 Link fields with users
  // 3 Load PDF + placeholders ( canvas )
  // 4 Render specific fields per user
  // 5 Fill Fields

  // Embed the Mario and emblem images

  // Get the form containing all the fields
  // Get all fields in the PDF by their names

// Fill in the basic info fields

// ageField.setText('24 years')
// heightField.setText(`5' 1"`)
// weightField.setText('196 lbs')
// eyesField.setText('blue')
// skinField.setText('white')
// hairField.setText('brown')

// Fill the character image field with our Mario image

// Fill in the allies field
// alliesField.setText(
//   [
//     `Allies:`,
//     `  • Princess Daisy`,
//     `  • Princess Peach`,
//     `  • Rosalina`,
//     `  • Geno`,
//     `  • Luigi`,
//     `  • Donkey Kong`,
//     `  • Yoshi`,
//     `  • Diddy Kong`,
//     ``,
//     `Organizations:`,
//     `  • Italian Plumbers Association`,
//   ].join('\n'),
// )

// Fill in the faction name field
// factionField.setText(`Mario's Emblem`)

// Fill the faction image field with our emblem image
// factionImageField.setImage(emblemImage)

// Fill in the backstory field
// backstoryField.setText(
//   `Mario is a fictional character in the Mario video game franchise, owned by Nintendo and created by Japanese video game designer Shigeru Miyamoto. Serving as the company's mascot and the eponymous protagonist of the series, Mario has appeared in over 200 video games since his creation. Depicted as a short, pudgy, Italian plumber who resides in the Mushroom Kingdom, his adventures generally center upon rescuing Princess Peach from the Koopa villain Bowser. His younger brother and sidekick is Luigi.`,
// )

// Fill in the traits field
// traitsField.setText(
//   [
//     `Mario can use three basic three power-ups:`,
//     `  • the Super Mushroom, which causes Mario to grow larger`,
//     `  • the Fire Flower, which allows Mario to throw fireballs`,
//     `  • the Starman, which gives Mario temporary invincibility`,
//   ].join('\n'),
// )

// Fill in the treasure field
// treasureField.setText(['• Gold coins', '• Treasure chests'].join('\n'))

readFileAsArrayBuffer(file: File): void {
  const reader = new FileReader();

  reader.onload = (e) => {
    const arrayBuffer = e.target.result as ArrayBuffer;
    // Now you have the file's data as an ArrayBuffer
    this.processArrayBuffer(arrayBuffer);
  };

  reader.readAsArrayBuffer(file);
}
imageBuffer
processArrayBuffer(arrayBuffer: ArrayBuffer): void {
  // Here, you can work with the arrayBuffer containing the file data
  // For example, you can convert it to a Uint8Array
  const uint8Array = new Uint8Array(arrayBuffer);
this.imageBuffer = uint8Array
  // Use uint8Array as needed, e.g., to send it to a server or process it further
}
drawImage(){
  debugger
  const pages = this.pdfDoc.getPages();
  const page = pages[0]; // Get the first page
  
  page.drawRectangle({
    x: 10,
    y: 300,
    width: 250,
    height: 75,
    borderWidth: 2,
    opacity:0,
    borderColor: rgb(0.0, 0.0, 0.0),
    color: rgb(1, 0, 0),
  })
  this.updatePdf()
}
}