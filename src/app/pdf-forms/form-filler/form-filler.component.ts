import { Field } from './field';
import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  ValidationErrors,
} from '@angular/forms';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import {
  PDFDocument,
} from 'pdf-lib';
import { PDFAnnotationData } from 'pdfjs-dist';
import { Input } from './input';
import { FormError } from './FormError';
import { FormGroupControls } from './FormGroupControls';
@Component({
  selector: 'app-form-filler',
  templateUrl: './form-filler.component.html',
  styleUrls: ['./form-filler.component.scss'],
})
export class FormFillerComponent {
  // screen DPI / PDF DPI
  readonly dpiRatio = 96 / 72;
  pageHeight;
  pageWidth;
  public pdfSrc = 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';

  public myForm: FormGroup;

  public inputList: Input[] = [];

  public zoom = 1;
  pdfBytes: ArrayBuffer;
  pdfDoc: PDFDocument;
  pdfForm: any;
  fields: any[];
  validationErrors: FormError[];
  error: any;
  hasErrors: boolean;

  constructor(private _fb: FormBuilder) {
    this.myForm = this._fb.group({});
  }

  private createInput(annotation: PDFAnnotationData, rect: number[] = null) {
    let formControl = new FormControl(annotation.buttonValue || '');
    console.log(annotation);
    const input = new Input();
    input.name = annotation.fieldName;
    input.maxLength = annotation.maxLen;
    input.isReadOnly = annotation.readOnly;
    if (annotation.fieldType === 'Ch') {
      input.type = 'dropdown';
      input.value = annotation.options || '';
    }
    if (annotation.fieldType === 'Tx') {
      input.type = 'text';
      input.value = annotation.buttonValue || '';
      input.maxLength = annotation.maxLen;
    }

    if (annotation.fieldType === 'Btn' && !annotation.checkBox) {
      input.type = 'radio';
      input.value = annotation.buttonValue;
    }

    if (annotation.checkBox) {
      input.type = 'checkbox';
      input.value = true;
      formControl = new FormControl(annotation.buttonValue || false);
    }
    rect = annotation.rect;
    // Calculate all the positions and sizes
    if (rect) {
      input.top = this.pageHeight - rect[3];
      input.left = rect[0];
      input.height = rect[3] - rect[1];
      input.width = rect[2] - rect[0];
    }

    this.inputList.push(input);
    return formControl;
  }

  private addInput(annotation: PDFAnnotationData, rect: number[] = null): void {
    // add input to page
    this.myForm.addControl(
      annotation.fieldName,
      this.createInput(annotation, rect)
    );
    // console.log(annotation.maxLen);

    annotation.maxLen != null ??
      this.myForm.controls[annotation.fieldName].setValidators([
        Validators.maxLength(annotation.maxLen),
        Validators.email,
        // Validators.
      ]);
  }

  public getInputPosition(input: Input): any {
    // console.log(input.type)

    if (input.type == 'dropdown') {
      var style = {
        top: `${input.top - 3}px`,
        left: `${input.left - 3}px`,
        height: `${input.height + 5}px`,
        width: `${input.width + 4}px`,
        transform:
        'matrix(' + this.dpiRatio + ', 0, 0, ' + this.dpiRatio + ', 0, 0)',
        'transform-origin': `${0 - input.left}px` + ' ' + `${0 - input.top}px`,
      };
    } else {
      var style = {
        top: `${input.top - 5}px`,
        left: `${input.left - 5}px`,
        height: `${input.height + 7}px`,
        width: `${input.width + 5}px`,
        transform:
          'matrix(' + this.dpiRatio + ', 0, 0, ' + this.dpiRatio + ', 0, 0)',
        'transform-origin': `${0 - input.left}px` + ' ' + `${0 - input.top}px`,
      };
    }
    return style;
  }
  public zoomIn(): void {
    this.inputList = this.inputList.map((i) => {
      i.left *= 0.25 / this.zoom + 1;
      i.top *= 0.25 / this.zoom + 1;
      i.width *= 0.25 / this.zoom + 1;
      i.height *= 0.25 / this.zoom + 1;
      return i;
    });
    this.zoom += 0.25;
  }

  public zoomOut(): void {
    this.inputList = this.inputList.map((i) => {
      i.left *= 1 - 0.25 / this.zoom;
      i.top *= 1 - 0.25 / this.zoom;
      i.width *= 1 - 0.25 / this.zoom;
      i.height *= 1 - 0.25 / this.zoom;
      return i;
    });
    this.zoom -= 0.25;
  }

  public loadComplete(pdf: PDFDocumentProxy): void {
    for (let i = 1; i <= pdf.numPages; i++) {
      // track the current page
      let currentPage = null;
      pdf
        .getPage(i)
        .then((p) => {
          currentPage = p;
          // console.log(currentPage._pageInfo.view)
          this.pageHeight = currentPage._pageInfo.view[3];
          this.pageWidth = currentPage._pageInfo.view[2];
          // get the annotations of the current page
          return p.getAnnotations();
        })
        .then((ann) => {
          // ugly cast due to missing typescript definitions
          // please contribute to complete @types/pdfjs-dist
          const annotations = (<any>ann) as PDFAnnotationData[];
          annotations
            .filter((a) => a.subtype === 'Widget') // get the form field annotation only
            .forEach((a) => {
              // get the rectangle that represent the single field
              // and resize it according to the current DPI
              const fieldRect = currentPage
                .getViewport(this.dpiRatio)
                .convertToViewportRectangle(a.rect);
              // console.log('rect ' , a.rect)
              // add the corresponding input
              this.addInput(a, fieldRect);
              // console.log('fieldRect ' , fieldRect)
            });
        });
    }
  }
  async savePdf() {
    this.getFormValidationErrors(this.myForm.controls)
    if(!this.hasErrors){


    await this.loadPdf(this.pdfSrc);
    this.pdfForm = await this.loadForm();
    await this.getFields();
    // console.log(this.fields);
    this.fields.forEach((field: Field) => {
      const fieldValue = this.myForm.controls[field.name].value;
      switch (field.type) {
        case 'PDFTextField': {
          this.fillTextField(field.name, fieldValue);
          this.readOnly(field.name, true);
          break;
        }
        case 'PDFDropdown': {
          if (fieldValue) {
            this.selectDropdown(field.name, fieldValue);
            this.readOnly(field.name, true);
          } else {
            this.myForm.controls[field.name].setErrors({ incorrect: true });
          }
          break;
        }
        case 'PDFCheckBox': {
          // console.log(fieldValue);
          if (fieldValue == true) {
            this.checkField(field.name);
          }
          this.readOnly(field.name, true);
          break;
        }
        default: {
          console.log('found a unknown field ', field.name);
          break;
        }
      }
    });
    this.saveFile();
  }
    for (const field in this.myForm.controls) {
      // 'field' is a string
      // console.log(field)
      //console.log(this.myForm.controls[field].value);
      // console.log(this.myForm.controls[field]);
    }
    // this.fillTextField('Given Name Text Box', 'GUIRAT');
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
  fillTextField(fieldName, fieldInput) {
    // Get field in the PDF by name
    var temp = this.pdfForm.getTextField(fieldName);
    temp.setText(fieldInput);
    // Fill in the basic info fields
    // console.log(temp)
    try {
      var tempfill = temp.setText(fieldInput);
    } catch (err: unknown) {
    }
  }
  selectDropdown(ddName, ddSelected) {
    // Get dropdown name
    const dropdown = this.pdfForm.getDropdown(ddName);
    // Select dropdown element
    dropdown.select(ddSelected);
  }

  checkField(cbName) {
    // Get checkbox item name
    const checkbox = this.pdfForm.getCheckBox(cbName);
    // Select dropdown element
    checkbox.check();
  }

  async getFields() {
    const fields = await this.pdfForm.getFields();
    this.fields = [];
    // console.log(fields);
    fields.forEach((field) => {
      const type = field.constructor.name;
      const name = field.getName();
      // console.warn(`${type}: ${name}`);
      this.fields.push({ type, name });
    });
  }

  async saveFile() {
    //  `pdfBytes` can be:
    //   • Written to a file in Node
    //   • Downloaded from the browser
    //   • Rendered in an <iframe>
    // Serialize the PDFDocument to bytes (a Uint8Array)
    this.pdfBytes = await this.pdfDoc.save();
    let file = new Blob([this.pdfBytes], { type: 'application/pdf' });
    var fileURL = URL.createObjectURL(file);
    // console.log(fileURL);
    this.openFileInNewTab(fileURL);
  }
  openFileInNewTab(fileURL) {
    window.open(fileURL);
  }
  readOnly(fieldName, val: boolean) {
    const field = this.pdfForm.getField(fieldName);
    if ((val = true)) field.enableReadOnly();
    else {
      field.disableReadOnly();
    }
  }
  validate(fieldLength, maxLength) {
    console.log(fieldLength, +' | ' + maxLength);
  }
  dropdownChange(newValue: string) {
    console.log(newValue);
  }
   errors: FormError[] = [];
    getFormValidationErrors(controls: FormGroupControls): FormError[] {
      this.hasErrors = false;
   this.errors =  [];
   this.myForm.markAllAsTouched();
    Object.keys(controls).forEach(key => {
      const control = controls[ key ];
      if (control instanceof FormGroup) {
        this.errors = this.errors.concat(this.getFormValidationErrors(control.controls));
      }
      const controlErrors: ValidationErrors = controls[ key ].errors;
      if (controlErrors !== null) {
        this.hasErrors=true;
        Object.keys(controlErrors).forEach(keyError => {
          this.errors.push({
            control_name: key,
            error_name: keyError,
            error_value: controlErrors[ keyError ]
          });
        });
      }
    });
    console.log(this.errors)
    return this.errors;
  }
}
