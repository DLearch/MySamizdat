import { Component, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';
import { trigger, style, transition, animate, group, state } from '@angular/animations';
import { DialogWindowService } from './dialog-window.service';

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
export class DialogWindowComponent implements OnDestroy, AfterViewInit {
  
  subscription: Subscription = null;
  componentPortal: ComponentPortal<any> = null;
  openCloseAnim: string = 'closed';
  
  constructor(
    public service: DialogWindowService,
    private cdRef: ChangeDetectorRef
  ) {
    this.subscription = service.subject.asObservable().subscribe(isOpen => isOpen ? this.open() : this.startClosing());
  }

  open(): void {
    this.componentPortal = new ComponentPortal(this.service.component);
    this.openCloseAnim = 'opened';
  }

  startClosing(): void {
    
    this.openCloseAnim = 'closed';
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (this.service.component) {
      this.service.subject.next(true);
      this.cdRef.detectChanges();
    }
  }

  finishClosing() {
    if (this.openCloseAnim == 'closed') {
      
      this.componentPortal = null;
      this.service.setConfig();
    }
  }
}
