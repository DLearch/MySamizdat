import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ComponentType } from '@angular/cdk/overlay/index';
import { DialogWindowConfig } from './dialog-window-config';

@Injectable()
export class DialogWindowService {

  subject = new Subject<boolean>();
  component: ComponentType<any> = null;

  get isOpen(): boolean {
    return this.component != null;
  }

  config: DialogWindowConfig = new DialogWindowConfig();

  open(component: ComponentType<any>, config?: DialogWindowConfig): void {

    this.component = component;
    this.setConfig(config);

    this.subject.next(true);
  }

  close(): void {

    this.component = null;
    this.subject.next(false);
  }

  setConfig(config?: DialogWindowConfig): void {
    this.config = { ...new DialogWindowConfig(), ...config };
  }
}
