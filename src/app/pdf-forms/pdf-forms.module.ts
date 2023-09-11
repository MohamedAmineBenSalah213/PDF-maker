import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFillerComponent } from './form-filler/form-filler.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormGeneratorComponent } from './form-generator/form-generator.component';
import { PDFRenderer } from './form-generator/pdf-viewer/pdf-renderer.component';
const routes: Routes = [
  {
    component: FormFillerComponent,
    path: 'filler',
  },
  {
    component: FormGeneratorComponent,
    path: 'generator',
  }
];

@NgModule({
  declarations: [
    FormFillerComponent,
    FormGeneratorComponent,
    PDFRenderer
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule],
})
export class PdfFormsModule { }
