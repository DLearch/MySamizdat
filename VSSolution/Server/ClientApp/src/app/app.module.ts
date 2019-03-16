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
import { AppComponent } from './app.component';
import { LogInterceptorService } from './services/log-interceptor/log-interceptor.service';
import { ApiService } from './services/api/api.service';
import { ConfigurationService } from './services/configuration/configuration.service';
import { AccountControllerService } from './api-services/account-controller/account-controller.service';
import { AuthControllerService } from './api-services/auth-controller/auth-controller.service';
import { BookControllerService } from './api-services/book-controller/book-controller.service';
import { BookmarkControllerService } from './api-services/bookmark-controller/bookmark-controller.service';
import { CatalogControllerService } from './api-services/catalog-controller/catalog-controller.service';
import { ChapterControllerService } from './api-services/chapter-controller/chapter-controller.service';
import { CommentControllerService } from './api-services/comment-controller/comment-controller.service';
import { PluralPipe } from './pipes/plural.pipe';
import { MatPaginatorIntl } from '@angular/material';
import { PaginatorIntl } from './paginator-intl';
import { TranslateService } from '@ngx-translate/core';
import { LanguageControllerService } from './api-services/language-controller/language-controller.service';
import { TeamControllerService } from './api-services/team-controller/team-controller.service';
import { ArrayPluralTranslatePipe } from './pipes/array-plural-translate.pipe';
import { PageService } from './services/page/page.service';
import { BreakpointService } from './services/breakpoint/breakpoint.service';
import { TimeAgoPluralTranslatePipe } from './pipes/time-ago-plural-translate.pipe';
import { LayoutComponent } from './layout/layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { ButtonComponent } from './components/button/button.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { FormComponent } from './components/form/form.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { UserPanelComponent } from './layout/user-panel/user-panel.component';
import { NewBookPageComponent } from './pages/new-book-page/new-book-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { CoverComponent } from './components/cover/cover.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NewCommentComponent } from './components/comments/new-comment/new-comment.component';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent
    , PluralPipe
    , ArrayPluralTranslatePipe
    , TimeAgoPluralTranslatePipe
    , LayoutComponent
    , LanguagePickerComponent
    , ThemePickerComponent, MainPageComponent, ErrorPageComponent, ButtonComponent, SignInComponent, SignUpComponent, FormComponent, SignUpPageComponent, SignInPageComponent, UserPanelComponent, NewBookPageComponent, BookPageComponent, CoverComponent, ChapterPageComponent, CommentsComponent, NewCommentComponent, AvatarComponent
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
    , UserStorageService
    , ConfigurationService
    , AccountControllerService
    , AuthControllerService
    , BookControllerService
    , BookmarkControllerService
    , CatalogControllerService
    , ChapterControllerService
    , CommentControllerService
    , LanguageControllerService
    , TeamControllerService
    , PluralPipe
    , PageService
    , BreakpointService
    , ThemePickerService
    , AuthGuard
    , {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorIntl();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    }
  ]
  , entryComponents: [
  ]
  , bootstrap: [AppComponent]
})
export class AppModule { }
