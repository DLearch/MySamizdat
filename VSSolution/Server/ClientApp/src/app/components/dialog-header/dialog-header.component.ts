import { Component, OnInit, Input } from '@angular/core';
import { DialogWindowService } from 'src/app/layout/dialog-window/dialog-window.service';

@Component({
  selector: 'app-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.css']
})
export class DialogHeaderComponent {

  @Input() titleTK: string = null;
  @Input() closeButtonVisible: boolean = false;

  constructor(
    private dialog: DialogWindowService
  ) { }
}
