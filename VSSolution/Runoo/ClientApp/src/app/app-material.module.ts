import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import {
  MatInputModule
  , MatFormFieldModule
  , MatButtonModule
  , MatToolbarModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule
  , MatCardModule
  , MatGridListModule
  , MatSelectModule
  , MatMenuModule
  , MatSlideToggleModule
  , MatDividerModule
  , MatPaginatorModule
  , MatProgressSpinnerModule
  , MatButtonToggleModule
  , MatDatepickerModule
  , MatNativeDateModule
  , MatSnackBarModule
  , MatStepperModule
  , MatTabsModule
  , MatCheckboxModule
  , MatBadgeModule
  , MatTooltipModule
} from '@angular/material';

const modules = [
  LayoutModule
  , PortalModule
  , OverlayModule
  , MatInputModule
  , MatFormFieldModule
  , MatButtonModule
  , MatToolbarModule
  , MatSidenavModule
  , MatIconModule
  , MatListModule
  , MatCardModule
  , MatGridListModule
  , MatSelectModule
  , MatMenuModule
  , MatSlideToggleModule
  , MatDividerModule
  , MatPaginatorModule
  , MatProgressSpinnerModule
  , MatButtonToggleModule
  , MatDatepickerModule
  , MatNativeDateModule
  , MatSnackBarModule
  , MatStepperModule
  , MatTabsModule
  , MatCheckboxModule
  , MatBadgeModule
  , MatTooltipModule
];
@NgModule({
  imports: [...modules],
  exports: [...modules]
})
export class AppMaterialModule { }
