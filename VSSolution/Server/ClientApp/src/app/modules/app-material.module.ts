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
  ]
})
export class AppMaterialModule { }
