import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './components/layout/app/app.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppTranslateModule } from './modules/app-translate.module';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppConfigService } from './services/app-config/app-config.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { JWTInterceptor } from './http-interceptors/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    AppTranslateModule
  ],
  providers: [
    AppConfigService,
    UserStorageService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
