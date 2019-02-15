import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

// App modules
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppTranslateModule } from './app-translate.module';

// Pages
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { AppComponent } from './app.component';
import { BookCreatingComponent } from './pages/book-creating/book-creating.component';

// Layout components
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { SignInComponent } from './layout/auth/sign-in/sign-in.component';
import { SignUpComponent } from './layout/auth/sign-up/sign-up.component';
import { EmailConfirmedComponent } from './layout/auth/email-confirmed/email-confirmed.component';
import { EmailUnconfirmedComponent } from './layout/auth/email-unconfirmed/email-unconfirmed.component';

// Other components
import { InputComponent } from './components/input/input.component';

// Services
import { LogInterceptorService } from './services/log-interceptor/log-interceptor.service';
import { ApiService } from './services/api/api.service';
import { AuthService } from './services/auth/auth.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { EmailConfirmationGuard } from './services/email-confirmation-guard/email-confirmation.guard';
import { BookService } from './services/book/book.service';

//////
import { BookComponent } from './pages/book/book.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DialogWindowComponent } from './layout/dialog-window/dialog-window.component';
import { DialogWindowService } from './services/dialog-window/dialog-window.service';
import { UserPanelComponent } from './layout/user-panel/user-panel.component';
import { SignInService } from './services/sign-in/sign-in.service';
import { SignUpService } from './services/sign-up/sign-up.service';
import { CommentComponent } from './components/comment/comment.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { LoadOverlayComponent } from './components/load-overlay/load-overlay.component';

@NgModule({
  declarations: [
    AppComponent
    , DefaultLayoutComponent
    , MainComponent
    , ErrorComponent
    , LanguagePickerComponent
    , SignInComponent
    , SignUpComponent
    , InputComponent
    , EmailConfirmedComponent
    , EmailUnconfirmedComponent
    , BookCreatingComponent
    , BookComponent
    , CatalogComponent
    , DialogWindowComponent
    , UserPanelComponent, CommentComponent, DialogHeaderComponent, LoadOverlayComponent
  ]
  , imports: [
    BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , BrowserAnimationsModule
    , HttpClientModule
    , ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    , AppMaterialModule
    , AppRoutingModule
    , AppTranslateModule
  ]
  , providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    }
    , ApiService
    , AuthService
    , UserStorageService
    , AuthGuard
    , EmailConfirmationGuard
    , BookService
    , DialogWindowService
    , SignInService
    , SignUpService
  ]
  , entryComponents: [
    SignInComponent
    , SignUpComponent
    , EmailConfirmedComponent
    , EmailUnconfirmedComponent
  ]
  , bootstrap: [AppComponent]
})
export class AppModule { }
