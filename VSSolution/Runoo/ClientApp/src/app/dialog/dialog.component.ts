import { Component, OnInit, Inject, Injector } from '@angular/core';
import { ComponentPortal, ComponentType, PortalInjector } from '@angular/cdk/portal';
import { dialogToken } from './dialog-token';
import { dialogDataInnerToken } from './dialog-data-inner-token';
import { dialogDataToken } from './dialog-data-token';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  host: {
    "class": "mat-app-background mat-elevation-z24"
  }
})
export class DialogComponent implements OnInit {

  portal: ComponentPortal<any> = null;

  constructor(
    @Inject(dialogToken) public component: ComponentType<any>,
    @Inject(dialogDataInnerToken) public data: any,
    private injector: Injector
  ) {
    this.portal = new ComponentPortal(component, null, this.createInjector(data));
  }

  ngOnInit() {
  }

  createInjector(data: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(dialogDataToken, data);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
