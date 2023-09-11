import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InteractionService } from '../Services/interaction.service';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import * as $ from 'jquery';
import { FieldSettingsComponent } from '../field-settings/field-settings.component';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.css'],
})
export class PdfGenerateComponent implements OnInit {



  pageNumber: number = 1;
  pageZoom: number = 1;
  pdfSrc: 'http://foersom.com/net/HowTo/data/OoPdfFormExample.pdf';
  tasks = [
    {
      id: 1,
      fieldName: 'aymen',
      fieldType: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
    {
      id: 1,
      fieldName: 'aymen',
      fieldType: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
    {
      id: 1,
      fieldName: 'aymen',
      fieldType: 'Input',
      X: '0',
      Y: '1',
      pageNumber: '0',
      assignedTo: 'anyone',
    },
  ];


  openDialog(): void {
    const dialogRef = this.dialog.open(FieldSettingsComponent, {
      // data: {name: name},
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  addInput(name) {
    console.log(name);
    console.log('name');
    switch (name) {
      case 'email': {
        this.tasks.push({
          id: this.tasks.length,
          fieldName: 'email',
          fieldType: 'email',
          assignedTo: 'anyone',
          pageNumber: '0',
          X: '0',
          Y: '0',
        });
        break;
      }
      case 'number': {
        this.tasks.push({
          id: this.tasks.length,
          fieldName: 'number',
          fieldType: 'number',
          assignedTo: 'anyone',
          pageNumber: '0',
          X: '0',
          Y: '0',
        });
        break;
      }
      case 'text': {
        this.tasks.push({
          id: this.tasks.length,
          fieldName: 'text',
          fieldType: 'text',
          assignedTo: 'anyone',
          pageNumber: '0',
          X: '0',
          Y: '0',
        });
        break;
      }
      case 'date': {
        this.tasks.push({
          id: this.tasks.length,
          fieldName: 'date',
          fieldType: 'date',
          assignedTo: 'anyone',
          pageNumber: '0',
          X: '0',
          Y: '0',
        });
        break;
      }
    }
  }
  constructor(
    private interactService: InteractionService,
    private route: ActivatedRoute,
    private _router: Router,
    public dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.interactService.init();
  }

  getNextPage() {
    if (this.pageNumber < this.Count) {
      this.pageNumber = this.pageNumber + 1;
    }
  }
  getPreviousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber = this.pageNumber - 1;
    }
  }
  Count: number = 0;
  getPagesCount(count: any) {
    this.Count = count.numPages;
    //console.log(count);
  }

  getCord() {
    let draggedElements = this.interactService.showCoordinates();
    console.log(draggedElements);
    for (let index = 0; index < this.tasks.length; index++) {
      this.tasks[index].X = draggedElements[index].X;
      this.tasks[index].Y = draggedElements[index].Y;
      this.tasks[index].pageNumber = draggedElements[index].pageNumber;
    }
  }
  getNumPages(event: { numPages: number }) {
    console.log(event);
    this.Count = event.numPages;
  }
  resetDraggedItem(item) {
    $(item).addClass('hidden');
    var parentDiv = $(item).parents().eq(1);
    $(item).parents().eq(1).find('.handle').css('position', 'relative');
    $(item).parents().eq(1).find('.handle').css('top', '0');
    $(item).parents().eq(1).find('.handle').css('left', '0');
    $(item).parents().eq(1).removeClass('resizable can-drop');
    $(item).parents().eq(1).css('width', '200px');
    $(item).parents().eq(1).css('height', 'unset');

    $(item).parents().eq(1).find('.handle').css('width', 'inherit');
    $(item).parents().eq(1).find('.handle').css('height', 'inherit');

    $(parentDiv).css('transform', '');
    $(parentDiv).attr('data-x', '0');
    $(parentDiv).attr('data-y', '0');
    $(parentDiv).attr('final-data-x', '0');
    $(parentDiv).attr('final-data-y', '0');
    $(parentDiv).attr('pageNumber', '0');
    $(parentDiv).removeClass('drop-target');
  }
}
