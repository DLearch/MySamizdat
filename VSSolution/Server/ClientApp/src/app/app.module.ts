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
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { PasswordSettingComponent } from './pages/password-setting/password-setting.component';
import { MainComponent } from './pages/main/main.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AccountComponent } from './pages/account/account.component';
import { BookComponent } from './pages/book/book.component';
import { SeriesComponent } from './pages/series/series.component';
import { UserComponent } from './pages/user/user.component';
import { TeamComponent } from './pages/team/team.component';
import { TeamCreatingComponent } from './pages/team-creating/team-creating.component';
import { SeriesCreatingComponent } from './pages/series-creating/series-creating.component';
import { BookCreatingComponent } from './pages/book-creating/book-creating.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';

// Layout components
import { AppComponent } from './layout/app/app.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { UserHeaderBlockComponent } from './layout/user-header-block/user-header-block.component';

// Other components
import { InputComponent } from './components/input/input.component';

// Services
import { LogInterceptorService } from './services/log-interceptor.service';
import { AccountService } from './services/account/account.service';
import { ApiService } from './services/api/api.service';
import { SignOutComponent } from './pages/sign-out/sign-out.component';

@NgModule({
  declarations: [
    AppComponent
    , LayoutComponent
    , LanguagePickerComponent
    , UserHeaderBlockComponent
    , MainComponent
    , ErrorComponent
    , SignInComponent
    , SignUpComponent
    , ChallengeComponent
    , EmailConfirmationComponent
    , PasswordSettingComponent
    , SettingsComponent
    , AccountComponent
    , BookComponent
    , SeriesComponent
    , UserComponent
    , TeamComponent
    , TeamCreatingComponent
    , SeriesCreatingComponent
    , BookCreatingComponent
    , InputComponent, SignOutComponent
  ],
  imports: [
    BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , BrowserAnimationsModule
    , HttpClientModule
    , ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
    , AppMaterialModule
    , AppRoutingModule
    , AppTranslateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi: true
    }
    , ApiService
    , AccountService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
