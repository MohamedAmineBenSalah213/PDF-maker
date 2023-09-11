import { HttpClient } from '@angular/common/http';
import { degrees, PDFDocument, rgb } from 'pdf-lib';
import { InteractionService } from './../../Services/interaction.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FieldSettingsComponent } from 'src/app/field-settings/field-settings.component';
import { MatDialog } from '@angular/material/dialog';
import { JsonFormData } from 'src/app/json-form/json-form.component';
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

var FieldsColors  = ["#574AE2","#FFBF00","#E83F6F","#480FB5","#6a8d73","#501537"]
@Component({
  selector: 'app-form-generator',
  templateUrl: './form-generator.component.html',
  styleUrls: ['./form-generator.component.css']
})

export class FormGeneratorComponent implements OnInit {
  pdfDoc: any;
  @ViewChild('labelContainer') labelContainer!:ElementRef;
  @ViewChild('inputContainer') inputContainer!: ElementRef;
  usedSignature:boolean = false;
  pageNumber: number = 1;
  pageZoom: number = 1;
  isDragging = false;
  offsetX = 0;
  offsetY = 0;
  top:number=0
  left=0
  pdfSrc = 'assets/contrat.pdf';
  src = 'assets/contrat.pdf';
   fields = [
    {
      id: 1,
      fieldName: 'Field 1 ',
      fieldType: 'Input',
      fromTop: '0',
      fromLeft: '1',
      pageNumber: '0',
      assignedTo: 'anyone',

    },
    {
      id: 2,
      fromTop: 'Field 2',
      fromLeft: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
    {
      id: 3,
      fieldName: 'Field 3',
      fieldType: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
  ];
  input=[];
  Coords: any[];
  formData: JsonFormData;
  constructor(
    private interactService: InteractionService,
    public dialog: MatDialog,
    private http:HttpClient

    ) { }

  ngOnInit(): void {
    this.interactService.init();
    this.http.get('/assets/my-form.json').subscribe((FormData:JsonFormData)=>{
      this.formData = FormData
    })
  }
  getCord(){
    let draggedElements = this.interactService.showCoordinates()
    //console.log(draggedElements);
    this.Coords  = draggedElements
    console.log(this.Coords);
  }
  signatureField(){
this.usedSignature = true; // if user uses a signature, every other field gets disabled
console.log('disabled all fields');
  }

  openDialog(def_values,def_validators): void {
    const dialogRef = this.dialog.open(FieldSettingsComponent);
    
    dialogRef.afterClosed().subscribe(field => {

      console.log('The dialog was closed');
      console.log('resultat' +field);
      const labelElement=document.createElement('div');
      //labelElement.className="drag-drop"    
      const inputElement = document.createElement('input');
      inputElement.className="drag-drop";
      console.log(field)
      inputElement.setAttribute('type', field.type);
      if(field.type==='email'){
        inputElement.setAttribute('pattern', "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}");
      }
     inputElement.setAttribute('value', field.value);
     inputElement.setAttribute('maxlength', field.Length);
     inputElement.setAttribute('max', field.maxValue);
      this.labelContainer.nativeElement.appendChild(labelElement)
      this.inputContainer.nativeElement.appendChild(inputElement);
   
    const pages = this.pdfDoc.getPages()
    const { width, height } =pages[0].getSize();
    const form = this.pdfDoc.getForm();
    const textField = form.createTextField();
    textField.setText(field.value);
   // textField.enableMultiline();
    const borderWidth = 1;
    textField.addToPage(pages[0], {
      x: 200 + borderWidth,
      y: 222 - 200 - 220 - borderWidth,
      width: 150,
      height: 200,
      textColor: rgb(0, 0, 0),
      backgroundColor: rgb(1, 1, 1),
      borderColor: rgb(0, 0, 0),
      borderWidth: borderWidth,
      rotate: degrees(0),
    })
    textField.setFontSize(40);
    })
    
  } 
    
  addTexField(){
this.openDialog(TextFieldDefaultValues,Default_Validators)

  }

 
}
