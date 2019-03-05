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
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { InputComponent } from './components/input/input.component';
import { LogInterceptorService } from './services/log-interceptor/log-interceptor.service';
import { ApiService } from './services/api/api.service';
import { BookComponent } from './pages/book/book.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { DialogWindowComponent } from './layout/dialog-window/dialog-window.component';
import { UserPanelComponent } from './layout/user-panel/user-panel.component';
import { LoadOverlayComponent } from './components/load-overlay/load-overlay.component';
import { CommentsComponent } from './components/comments/comments.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ImageLoadComponent } from './components/image-load/image-load.component';
import { BackdropComponent } from './components/backdrop/backdrop.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';
import { AccountComponent } from './pages/account/account.component';
import { ConfigurationService } from './services/configuration/configuration.service';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthService } from './auth/auth.service';
import { UserStorageService } from './auth/user-storage.service';
import { AuthGuard } from './auth/auth.guard';
import { DialogWindowService } from './layout/dialog-window/dialog-window.service';
import { AvatarComponent } from './components/avatar/avatar.component';
import { ImageComponent } from './components/image/image.component';
import { NewCommentComponent } from './components/comments/new-comment/new-comment.component';
import { NewChapterComponent } from './pages/new-chapter/new-chapter.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { AccountControllerService } from './api-services/account-controller/account-controller.service';
import { AuthControllerService } from './api-services/auth-controller/auth-controller.service';
import { BookControllerService } from './api-services/book-controller/book-controller.service';
import { BookmarkControllerService } from './api-services/bookmark-controller/bookmark-controller.service';
import { CatalogControllerService } from './api-services/catalog-controller/catalog-controller.service';
import { ChapterControllerService } from './api-services/chapter-controller/chapter-controller.service';
import { CommentControllerService } from './api-services/comment-controller/comment-controller.service';
import { PluralPipe } from './pipes/plural.pipe';
import { ButtonComponent } from './components/button/button.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { MatPaginatorIntl } from '@angular/material';
import { PaginatorIntl } from './paginator-intl';
import { TranslateService } from '@ngx-translate/core';
import { PageWrapperComponent } from './components/page-wrapper/page-wrapper.component';
import { LanguageControllerService } from './api-services/language-controller/language-controller.service';
import { NewTeamComponent } from './pages/new-team/new-team.component';
import { TeamControllerService } from './api-services/team-controller/team-controller.service';
import { TeamComponent } from './pages/team/team.component';
import { FormComponent } from './components/form/form.component';
import { ArrayPluralTranslatePipe } from './pipes/array-plural-translate.pipe';
import { TimePluralTranslatePipe } from './pipes/time-plural-translate.pipe';

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
    , BookComponent
    , CatalogComponent
    , DialogWindowComponent
    , UserPanelComponent
    , LoadOverlayComponent
    , CommentsComponent
    , ChapterComponent
    , ImageLoadComponent
    , BackdropComponent
    , ThemePickerComponent
    , AccountComponent
    , AvatarComponent
    , ImageComponent
    , NewCommentComponent
    , NewChapterComponent
    , NewBookComponent
    , PluralPipe
    , ButtonComponent
    , BookmarksComponent, PageWrapperComponent, NewTeamComponent, TeamComponent, FormComponent, ArrayPluralTranslatePipe, TimePluralTranslatePipe
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
    , DialogWindowService
    , ThemePickerService
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
    SignInComponent
    , SignUpComponent
    , ImageLoadComponent
  ]
  , bootstrap: [AppComponent]
})
export class AppModule { }
