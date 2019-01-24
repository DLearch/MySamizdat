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

@NgModule({
  imports: [
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
  ],
  exports: [
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
  ]
})
export class AppMaterialModule { }
