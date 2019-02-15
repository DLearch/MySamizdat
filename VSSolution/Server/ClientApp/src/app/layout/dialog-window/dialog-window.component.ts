import { Component, OnDestroy, ViewContainerRef, Renderer2, ElementRef } from '@angular/core';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { DialogWindowService } from 'src/app/services/dialog-window/dialog-window.service';
import { Subscription } from 'rxjs';
import { trigger, style, transition, animate, group, state } from '@angular/animations';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
  , host: {
    'class': 'cdk-overlay-container'
  }
  , animations: [
    trigger('openClose', [
      state('opened', style({ opacity: 1 })),
      state('closed', style({ opacity: 0 })),
      transition('opened => closed', animate('0.2s')),
      transition(':enter', [
        style({ opacity: 0 }),
        group([
          animate('0.2s', style({
            opacity: 1
          }))
        ])])
    ]),
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DialogWindowComponent implements OnDestroy {

  subscription: Subscription = null;
  componentPortal: ComponentPortal<any> = null;
  openCloseAnim: string = 'closed';
  
  constructor(
    public service: DialogWindowService
  ) {
    this.subscription = service.subject.asObservable().subscribe(isOpen => isOpen ? this.open() : this.close());
  }

  open(): void {
    this.componentPortal = new ComponentPortal(this.service.component);
    this.service.isOpen = true;
    this.openCloseAnim = 'opened';
  }

  close(): void {
    
    this.openCloseAnim = 'closed';
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  openCloseDone() {
    if (this.openCloseAnim == 'closed') {

      this.service.isOpen = false;
      this.componentPortal = null;
    }
  }
}
