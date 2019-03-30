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
} from '@angular/material';

const modules = [
  LayoutModule
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
  , PortalModule
  , MatProgressSpinnerModule
  , MatButtonToggleModule
  , MatDatepickerModule
  , MatNativeDateModule
  , MatSnackBarModule
  , MatStepperModule
  , OverlayModule
  , MatTabsModule
  , MatCheckboxModule
];

@NgModule({
  imports: [...modules]
  , exports: [...modules]
})
export class AppMaterialModule { }
