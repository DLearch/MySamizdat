import { Component, OnDestroy } from '@angular/core';
import { ComponentPortal } from '@angular/cdk/portal';
import { DialogWindowService } from 'src/app/services/dialog-window/dialog-window.service';
import { Subscription } from 'rxjs';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-dialog-window',
  templateUrl: './dialog-window.component.html',
  styleUrls: ['./dialog-window.component.css']
  , host: {
    'class': 'cdk-overlay-container'
  }
  , animations: [
    trigger('backdrop', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.2s', style({ opacity: 0 }))
      ])
    ])
    , trigger('slide', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.2s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('1s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class DialogWindowComponent implements OnDestroy {

  subscription: Subscription = null;
  componentPortal: ComponentPortal<any> = null;
  
  constructor(
    private service: DialogWindowService
  ) {
    this.subscription = service.subject.asObservable().subscribe(isOpen => isOpen ? this.open() : this.close());
  }

  open(): void {
    this.componentPortal = new ComponentPortal(this.service.component);
    this.service.isOpen = true;
    console.log(this.componentPortal);
  }

  close(): void {
    this.componentPortal = null;
    this.service.isOpen = false;
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
