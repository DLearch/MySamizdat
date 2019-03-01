import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { PortalModule } from '@angular/cdk/portal';
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
];

@NgModule({
  imports: [...modules]
  , exports: [...modules]
})
export class AppMaterialModule { }
