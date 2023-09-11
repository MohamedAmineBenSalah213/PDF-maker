import { JsonFormComponent } from './../json-form/json-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import {MatButtonModule} from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';



@NgModule({
  declarations: [
    JsonFormComponent
  ],
  imports: [
    CommonModule,
    PdfViewerModule,MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSliderModule


  ],
  exports:[
    PdfViewerModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    JsonFormComponent,
    MatSliderModule
  ]
})
export class SharedModule { }
