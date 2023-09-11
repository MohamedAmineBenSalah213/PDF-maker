import { Component, EventEmitter, OnInit,Output,ViewChild } from '@angular/core';
import { NgSignaturePadOptions,SignaturePadComponent } from '@almothafar/angular-signature-pad';
import SignaturePad, { Options, PointGroup } from 'signature_pad';
import { InteractionService } from '../Services/interaction.service';
@Component({
  selector: 'app-signature-settings',
  templateUrl: './signature-settings.component.html',
  styleUrls: ['./signature-settings.component.css']
})
export class SignatureSettingsComponent implements OnInit {
  isDrawn=false;
  private history:PointGroup[]=[];
  private future:PointGroup[]=[];
  @Output() canvasDataEmitter = new EventEmitter<string>();
  @ViewChild('signature')
  public signaturePad!:SignaturePadComponent;
  public signaturePadOptions:NgSignaturePadOptions={
    minWidth:1,
    canvasWidth:300,
    canvasHeight:200,
    penColor:'black',
    backgroundColor:'white',
    dotSize:1,
    maxWidth:1,
    velocityFilterWeight:1
  }
  constructor(private interactionservice : InteractionService) { }

  ngOnInit(): void {
    this.interactionservice.init();
  }
  drawComplete(event: MouseEvent | Touch) {
    // will be notified of simek/signature_pad's onEnd event
    console.log('Completed drawing', event);
    
    console.log(this.signaturePad.toDataURL());
    this.isDrawn=true;
  }

  drawStart(event: MouseEvent | Touch) {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('Start drawing', event);
  }
  clear(){
    this.history=[];
    this.future=[];
    this.signaturePad.clear();
  }
  redo() {
    if (this.history.length > 0 && this.future.length > 0) {
      const data = this.signaturePad.toData();
      if (data !== undefined) { // Check if data is defined
        // Clone the existing data array and add the data from the future
        const newData = [...data];
        const addData = this.future.pop();
  
        if (addData) {
          newData.push(addData);
          this.signaturePad.fromData(newData);
        }
      }
    }
  }
  
  
  undo(){
    var data =this.signaturePad.toData();
    if(data || data ==undefined){
      const lastStrock:any= this.history.pop();
      const removeStrock:any = data.pop();
      this.future.push(removeStrock);
      this.signaturePad.fromData(data);
    }
    
  }
  savePNG(){
    //console.log(selectElements);
           
    if(this.signaturePad.isEmpty()){
      
    }
    const data =this.signaturePad.toDataURL('image/svg+xml');
    console.log("draw"+data);
      

    // Convert binary data to UTF-8 string
    const svgText = new TextDecoder('utf-8').decode(new Uint8Array([...data].map(char => char.charCodeAt(0))));
    console.log(svgText)
    this.canvasDataEmitter.emit(svgText.toString());
    const link =document.getElementsByTagName('canvas');
    for (let i = 0; i < link.length; i++) {
      link[i].classList.add("drag-drop");
      console.log(link[i].className);
  } 
   /*  link=data;
    console.log(link);
    
    link.classList.add("drag-drop") */
  }
  prrGetSignatureData:PointGroup[]=[]
  ngAfterViewInit(){
    this.signaturePad.set('minWidth',5);
    this.signaturePad.fromData(this.prrGetSignatureData);
    const canvas=this.signaturePad.getCanvas()
    if(canvas){
      const ctx=canvas.getContext('2d');
      if(ctx){
        const text='Signature _______________________';
        const x=20
        const y=canvas.height-40;
        ctx.font="16px Arial";
        ctx.fillStyle="black";
        ctx.fillText(text,x,y)
      }
    }
  }
}
