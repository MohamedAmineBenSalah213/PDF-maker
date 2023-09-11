import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-field-settings',
  templateUrl: './field-settings.component.html',
  styleUrls: ['./field-settings.component.css'],
})
export class FieldSettingsComponent implements OnInit {
  @Output() fieldDataEmitter = new EventEmitter<any>();
  constructor(
    public dialogRef: MatDialogRef<FieldSettingsComponent>,
    
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  
  showUsers: boolean = false;
  showStages: boolean = false;
  inputTypes: string[] = ['number', 'text'];

  assignementList: any[] = [
    { id: 0, name: 'Anyone' },
    { id: 1, name: 'Anyone from stage' },
    { id: 2, name: 'Specific user' },
  ];
  users: any[] = [
    { email: 'aymen@consultim.com', name: 'aymen hamadi' },
    { email: 'fathi@consultim.com', name: 'fathi dridi' },
  ];
  stages: any[] = [
    { id: '0', name: 'Sign' },
    { id: '1', name: 'Review' },
    { id: '2', name: 'Approve' },
  ];
  defaultValues:any[]=[
    { key: '1', value: 'aymen hamadi' },
    { key: '2', value: 'fathi dridi' },
  ]
  ngOnInit(): void {
    console.log(this.data);
  }

  toggle(id) {
    id == 2 ? (this.showUsers = true) : (this.showUsers = false);
    id == 1 ? (this.showStages = true) : (this.showStages = false);
    console.log(this.showUsers);
  }
  selectedType;
  showSelectedType(e) {
    console.log(e);
  }
  is_Required: boolean = false;
  is_email: boolean = false;
  accept_multiple_input: boolean = false;
  has_max_length: boolean = false;
  has_default_value: boolean = false;
  has_min_value: boolean = false;
  has_max_value: boolean = false;
  toggleRequired() {
    console.log(this.is_Required);
  }
  
  toggleMultipleInput() {
    console.log(this.is_Required);
  }

  setDefaultValue() {
    if (this.has_default_value) {
      console.log(this.has_default_value);
    }
  }
  fieldData:any
  fieldName: string ='';
  defVal: any;
  maxLength:number;
  minLength:number;
  maxValue:number;
  minValue:number;
  issubmit:boolean=false
   submit() {
    var field  = {
      name: this.fieldName,
      label: this.fieldName + ' : ',
      value: this.defVal,
      type: this.selectedType,
      maxLength:this.maxLength,
      minLength:this.minLength,
      min:this.minValue,
      max:this.maxValue,
      top:0,
      left:0,
    //  assignedTo:
      validators: {},
    };
    const validatorsToAdd = [];

    var req;
    if (this.is_Required) {
      validatorsToAdd.push(Validators.required)
    }
    if (this.selectedType==='email'){
      validatorsToAdd.push(Validators.email)
    }
    if (this.has_max_length){
      validatorsToAdd.push(Validators.maxLength(this.maxLength))
    }
    if (this.has_max_value){
      validatorsToAdd.push(Validators.max(this.maxValue))
    }
    if (this.has_min_value){
      validatorsToAdd.push(Validators.max(this.minValue))
    }
    console.log(this.has_max_length,this.maxValue,this.minValue)   
 
    field.validators=validatorsToAdd
    console.log(field)
    console.log(field.validators)
    this.issubmit=true,
    

     // You can send data back to the parent component by calling close() with the data
     this.fieldDataEmitter.emit(field);


  }
  
  minL:Number = 0;
  maxL:Number = 0;
}

