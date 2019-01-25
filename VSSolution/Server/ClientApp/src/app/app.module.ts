import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { PasswordChangeComponent } from './components/account/password-change/password-change.component';
import { ApiService } from './services/api/api.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { InputComponent } from './components/forms/input/input.component';
import { Observable } from 'rxjs';
import { ConfirmEmailComponent } from './components/account/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from './components/account/email-confirmed/email-confirmed.component';
import { EmailUnconfirmedComponent } from './components/account/email-unconfirmed/email-unconfirmed.component';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    console.log(req);

    return next.handle(req);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NotFoundComponent,
    SignUpComponent,
    SignInComponent,
    LangPickerComponent,
    AccountComponent,
    PasswordChangeComponent,
    InputComponent,
    ConfirmEmailComponent,
    EmailConfirmedComponent,
    EmailUnconfirmedComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppMaterialModule,
    AppRoutingModule,
    AppTranslateModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    AppConfigService,
    UserStorageService,
    AuthorizationGuard,
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
