import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppMaterialModule } from './app-material.module';
import { AppTranslateModule } from './app-translate.module';
import { ErrorComponent } from './pages/error/error.component';
import { MainComponent } from './pages/main/main.component';
import { AppComponent } from './app.component';
import { BookCreatingComponent } from './pages/book-creating/book-creating.component';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { InputComponent } from './components/input/input.component';
import { LogInterceptorService } from './services/log-interceptor/log-interceptor.service';
import { ApiService } from './services/api/api.service';
import { BookService } from './services/book/book.service';
import { BookComponent } from './pages/book/book.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DialogWindowComponent } from './layout/dialog-window/dialog-window.component';
import { UserPanelComponent } from './layout/user-panel/user-panel.component';
import { CommentComponent } from './components/comment/comment.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { LoadOverlayComponent } from './components/load-overlay/load-overlay.component';
import { CommentsComponent } from './components/comments/comments.component';
import { CommentCreatingComponent } from './components/comment-creating/comment-creating.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ChapterCreatingComponent } from './pages/chapter-creating/chapter-creating.component';
import { ChapterService } from './services/chapter/chapter.service';
import { CommentService } from './services/comment/comment.service';
import { ImageLoadComponent } from './components/image-load/image-load.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';
import { AccountComponent } from './pages/account/account.component';
import { AccountService } from './pages/account/account.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './auth/auth.service';
import { UserStorageService } from './auth/user-storage.service';
import { AuthGuard } from './auth/auth.guard';
import { DialogWindowService } from './layout/dialog-window/dialog-window.service';
import { ApiAuthService } from './auth/api-auth/api-auth.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ImageComponent } from './components/image/image.component';

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
    , BookCreatingComponent
    , BookComponent
    , CatalogComponent
    , DialogWindowComponent
    , UserPanelComponent
    , CommentComponent
    , DialogHeaderComponent
    , LoadOverlayComponent
    , CommentsComponent
    , CommentCreatingComponent
    , ChapterComponent
    , ChapterCreatingComponent
    , ImageLoadComponent
    , BackdropComponent
    , ThemePickerComponent
    , AccountComponent
    , AvatarComponent
    , ImageComponent
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
    , BookService
    , DialogWindowService
    , ApiAuthService
    , ChapterService
    , CommentService
    , ThemePickerService
    , AccountService
    , ConfigurationService
  ]
  , entryComponents: [
    SignInComponent
    , SignUpComponent
    , ImageLoadComponent
  ]
  , bootstrap: [AppComponent]
})
export class AppModule { }
