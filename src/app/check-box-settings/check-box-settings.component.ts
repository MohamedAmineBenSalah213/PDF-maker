import { Component,ElementRef,Inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-check-box-settings',
  templateUrl: './check-box-settings.component.html',
  styleUrls: ['./check-box-settings.component.css']
})
export class CheckBoxSettingsComponent implements OnInit {
  checkboxes: { label: string, checked: boolean }[] = [];
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
  @ViewChild('checkboxContainer', { static: true }) checkboxContainer: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<CheckBoxSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private renderer :Renderer2
  ) { }

  ngOnInit(): void {
  }
  fieldName: string ='';
  user:string ='';
  selectstage:string="";
  toggle(id) {
    id == 2 ? (this.showUsers = true) : (this.showUsers = false);
    id == 1 ? (this.showStages = true) : (this.showStages = false);
    console.log(this.showUsers);
  }
  selectedType;
  showSelectedType(e) {
    console.log(e);
  }
  submit() {
    var field  = {
      name: this.fieldName,
      label: this.fieldName + ' : ',
      assign: this.user,
      selectstage:this.selectstage,
    };
      console.log(field)
     // You can send data back to the parent component by calling close() with the data
     this.fieldName = '';

    }

}
