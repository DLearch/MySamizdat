import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
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
];

@NgModule({
  imports: [...modules]
  , exports: [...modules]
})
export class AppMaterialModule { }
