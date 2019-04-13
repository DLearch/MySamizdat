import { Injectable, Injector } from '@angular/core';
import { Overlay, ComponentType, OverlayRef } from '@angular/cdk/overlay';
import { Subject, Observable } from 'rxjs';
import { DialogComponent } from './dialog.component';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { dialogToken } from './dialog-token';
import { dialogDataInnerToken } from './dialog-data-inner-token';

@Injectable()
export class DialogService {

  overlayRef: OverlayRef;
  private onCloseSubject: Subject<any>;

  opened: boolean = false;

  constructor(
    private overlay: Overlay,
    private injector: Injector
  ) { }

  open(component: ComponentType<any>, data: any = null): Observable<any> {

    if (this.opened)
      this.close();
    
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({ hasBackdrop: true, positionStrategy: positionStrategy });

    const portal = new ComponentPortal(DialogComponent, null, this.createInjector(component, data));
    this.overlayRef.attach(portal);
    this.overlayRef.backdropClick().subscribe(() => this.close());
    this.opened = true;

    this.onCloseSubject = new Subject<any>();
    return this.onCloseSubject.asObservable();
  }

  close(data: any = null) {
    this.overlayRef.dispose();
    this.opened = false;

    this.onCloseSubject.next(data);
  }

  createInjector(component: ComponentType<any>, data: any): PortalInjector {
    const injectorTokens = new WeakMap();
    injectorTokens.set(dialogToken, component);
    injectorTokens.set(dialogDataInnerToken, data);
    return new PortalInjector(this.injector, injectorTokens);
  }
}
