import { Component, OnInit, Inject } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { dialogToken } from './dialog-token';
import { ComponentType } from '@angular/core/src/render3';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  portal: ComponentPortal<any> = null;

  constructor(
    @Inject(dialogToken) public data: ComponentType<any>
  ) {
    this.portal = new ComponentPortal(data);
  }

  ngOnInit() {
  }
}
