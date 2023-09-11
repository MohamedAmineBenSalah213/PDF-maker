import { Component, OnInit } from '@angular/core';
import jspdf from 'jspdf';
import { PDFDocument } from 'pdf-lib';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
//   title = 'pdfmaker';
//   doc: any;
//   a4H = 3508;
//   a4W = 2480;
//   newlineHeight = 20;
//   pdfFile:any;
//   leftMargin = 15;
//   out_pdfName = 'sample'+this.getRandomId()+'.pdf';
//   fileUrl : string = "";
//   pdfBytes : any;
//   arrayB:any;
//   constructor(private http: HttpClient) {}
//   ngOnInit() {

//   }
//   addText(text:string,fromLeft:number,fromTop:number){
//     fromTop+=5 // line height
//     this.doc.text(text, fromLeft, fromTop);
//   }
//   createPdf(){
// debugger
//     this.doc = new jspdf();
//     this.doc.setFontSize(11);

//     this.doc.setFont('Helvetica', 'bold');
//     this.addText('test',1,1);
//     this.addText('hello',1,1);
//     const page = this.doc.addPage();
//     this.doc.save(this.out_pdfName);
//     this.arrayB = this.doc.output('arraybuffer');
//     this.createDocument(this.arrayB);

//   }
//   async createDocument(arrayB: any) {
//     const pdfDoc = await PDFDocument.create();
//     const firstDoc = await PDFDocument.load(arrayB); //arrayB from the last step of jspdf above.
//     this.pdfFile = firstDoc
//     // const firstPage = await pdfDoc.copyPages(
//     //   firstDoc,
//     //   firstDoc.getPageIndices()
//     // );
//     // firstPage.forEach((page) => pdfDoc.addPage(page));
//     // const secondPdfBytes = await fetch('/assets/pdfs/' + this.out_pdfName).then(
//     //   (res) => res.arrayBuffer()
//     // )

//     // const secondDoc = await PDFDocument.load(secondPdfBytes);
//     // const secondPage = await pdfDoc.copyPages(
//     //   secondDoc,
//     //   secondDoc.getPageIndices()
//     // );
//     // secondPage.forEach((page) => pdfDoc.addPage(page));

//     this.pdfBytes = await pdfDoc.save();
//     let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
//     var fileURL = URL.createObjectURL(file);
//     // window.open(fileURL);
//     console.log(this.pdfBytes)
// this.fileUrl=fileURL;
//   }

//    getRandomId() {
//     return Math.floor((Math.random()*6)+1);
// }
// }
}
