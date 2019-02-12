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
  , MatBottomSheetModule
  , MatDividerModule
  , MatPaginatorModule
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
  , MatBottomSheetModule
  , MatDividerModule
  , MatPaginatorModule
  , PortalModule
];

@NgModule({
  imports: [...modules]
  , exports: [...modules]
})
export class AppMaterialModule { }
