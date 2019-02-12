import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { DialogWindowComponent } from './dialog-window.component';
import { PortalModule } from '@angular/cdk/portal';

@NgModule({
  imports: [
    CommonModule
    , OverlayModule
    , PortalModule
  ]
  , declarations: [DialogWindowComponent]
})
export class DialogWindowModule { }
