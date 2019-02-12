import { Injectable } from '@angular/core';
import { ComponentType } from '@angular/cdk/overlay/index';
import { Subject } from 'rxjs';
import { DialogWindowConfig } from './dialog-window-config';
import { DialogWindowComponent } from './dialog-window.component';

@Injectable({ providedIn: DialogWindowComponent })
export class DialogWindow {
  subject = new Subject<boolean>();
  component: ComponentType<any> = null;
  isOpen: boolean = false;
  config: DialogWindowConfig = new DialogWindowConfig();

  open(component: ComponentType<any>, config?: DialogWindowConfig): void {
    
    this.component = component;
    this.setConfig(config);

    this.subject.next(true);
  }

  close(): void {

    this.component = null;
    this.setConfig();

    this.subject.next(false);
  }

  private setConfig(config?: DialogWindowConfig): void {
    this.config = { ...new DialogWindowConfig(), ...config };
  }
}

