import { Component, OnInit } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { FormGroup } from '@angular/forms';
import { InputTemplate } from 'src/app/components/form/input-template';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  componentTK = 'dialog.edit.';

  formTemplate: InputTemplate[];
  formErrors: any;

  constructor(
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    
  }

  save(form: FormGroup) {

  }
}
