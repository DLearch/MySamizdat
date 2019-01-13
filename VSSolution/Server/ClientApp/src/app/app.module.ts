import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './components/layout/app/app.component';
import { AppMaterialModule } from './modules/app-material.module';
import { AppRoutingModule } from './modules/app-routing.module';
import { AppTranslateModule } from './modules/app-translate.module';
import { MainComponent } from './components/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AppConfigService } from './services/app-config/app-config.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { SignUpComponent } from './components/account/sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignInComponent } from './components/account/sign-in/sign-in.component';
import { LangPickerComponent } from './components/layout/lang-picker/lang-picker.component';
import { AccountComponent } from './components/account/account/account.component';
import { AuthorizationGuard } from './guards/authorization.guard';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    LangPickerComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    AppTranslateModule
  ],
  providers: [
    AppConfigService,
    UserStorageService,
    AuthorizationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
