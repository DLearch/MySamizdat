import { Injectable, Injector } from '@angular/core';
import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { DialogComponent } from './dialog.component';
import { dialogToken } from './dialog-token';

@Injectable()
export class DialogService {

  overlayRef: OverlayRef;

  opened: boolean = false;

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  open(component: ComponentType<any>) {

    if (this.opened)
      this.close();
    
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({ hasBackdrop: true, positionStrategy: positionStrategy });

    const portal = new ComponentPortal(DialogComponent, null, this.createInjector(component));
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.opened = true;
  }

  close() {
    this.overlayRef.dispose();
    this.opened = false;
  }

  createInjector(component: ComponentType<any>): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(dialogToken, component);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
