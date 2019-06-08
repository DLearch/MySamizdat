import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AppTranslateModule } from './app-translate.module';
import { AppMaterialModule } from './app-material.module';
import { UserStorageService } from './services/user-storage/user-storage.service';
import { ApiService } from './api/api.service';
import { AuthControllerService } from './api/auth/auth-controller.service';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { LayoutComponent } from './layout/layout.component';
import { LanguagePickerComponent } from './layout/language-picker/language-picker.component';
import { ThemePickerComponent } from './layout/theme-picker/theme-picker.component';
import { NotificationsComponent } from './layout/notifications/notifications.component';
import { DialogComponent } from './dialog/dialog.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { FlexSpacerComponent } from './components/flex-spacer/flex-spacer.component';
import { ButtonComponent } from './components/button/button.component';
import { PageService } from './services/page/page.service';
import { ConfigService } from './services/config/config.service';
import { BreakpointService } from './services/breakpoint/breakpoint.service';
import { ThemePickerService } from './layout/theme-picker/theme-picker.service';
import { FormComponent } from './components/form/form.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { SearchComponent } from './components/search/search.component';
import { DialogService } from './dialog/dialog.service';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignUpDialogComponent } from './dialogs/sign-up-dialog/sign-up-dialog.component';
import { SignInDialogComponent } from './dialogs/sign-in-dialog/sign-in-dialog.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { DialogGuard } from './guards/dialog/dialog.guard';
import { PluralTranslatePipe } from './pipes/plural-translate.pipe';
import { ArrayLengthPluralTranslatePipe } from './pipes/array-length-plural-translate.pipe';
import { TimeAgoPluralTranslatePipe } from './pipes/time-ago-plural-translate.pipe';
import { BookControllerService } from './api/book/book-controller.service';
import { BookStateControllerService } from './api/book-state/book-state-controller.service';
import { ChapterControllerService } from './api/chapter/chapter-controller.service';
import { ChapterStateControllerService } from './api/chapter-state/chapter-state-controller.service';
import { CommentControllerService } from './api/comment/comment-controller.service';
import { LanguageControllerService } from './api/language/language-controller.service';
import { NotificationControllerService } from './api/notification/notification-controller.service';
import { TeamControllerService } from './api/team/team-controller.service';
import { UserControllerService } from './api/user/user-controller.service';
import { MatPaginatorIntl } from '@angular/material';
import { PaginatorIntl } from './paginator-intl';
import { TranslateService } from '@ngx-translate/core';
import { TeamInviteNotificationComponent } from './layout/notifications/team-invite-notification/team-invite-notification.component';
import { FiltersComponent } from './components/filters/filters.component';
import { CatalogComponent } from './components/catalog/catalog.component';
import { FiltersDialogComponent } from './dialogs/filters-dialog/filters-dialog.component';
import { CommentsComponent } from './components/comments/comments.component';
import { NewCommentComponent } from './components/comments/new-comment/new-comment.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { NewBookPageComponent } from './pages/new-book-page/new-book-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { CoverComponent } from './components/cover/cover.component';
import { FiltersDialogService } from './dialogs/filters-dialog/filters-dialog.service';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { UpdateChapterPageComponent } from './pages/update-chapter-page/update-chapter-page.component';
import { UpdateBookPageComponent } from './pages/update-book-page/update-book-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { NewTeamComponent } from './components/new-team/new-team.component';
import { NewTeamPageComponent } from './pages/new-team-page/new-team-page.component';
import { NewTeamDialogComponent } from './dialogs/new-team-dialog/new-team-dialog.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamInviteMemberComponent } from './components/team-invite-member/team-invite-member.component';
import { TeamInviteMemberPageComponent } from './pages/team-invite-member-page/team-invite-member-page.component';
import { TeamInviteMemberDialogComponent } from './dialogs/team-invite-member-dialog/team-invite-member-dialog.component';
import { SupportPageComponent } from './pages/support-page/support-page.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    SignInComponent,
    LayoutComponent,
    LanguagePickerComponent,
    ThemePickerComponent,
    NotificationsComponent,
    DialogComponent,
    ErrorPageComponent,
    FlexSpacerComponent,
    ButtonComponent,
    FormComponent,
    SignUpComponent,
    SearchComponent,
    SignInPageComponent,
    SignUpPageComponent,
    SignUpDialogComponent,
    SignInDialogComponent,
    PluralTranslatePipe,
    ArrayLengthPluralTranslatePipe,
    TimeAgoPluralTranslatePipe,
    TeamInviteNotificationComponent,
    FiltersComponent,
    CatalogComponent,
    FiltersDialogComponent,
    CommentsComponent,
    NewCommentComponent,
    AvatarComponent,
    NewBookPageComponent,
    BooksPageComponent,
    CoverComponent,
    BookPageComponent,
    ChapterPageComponent,
    UpdateChapterPageComponent,
    UpdateBookPageComponent,
    UserPageComponent,
    TeamsPageComponent,
    NewTeamComponent,
    NewTeamPageComponent,
    NewTeamDialogComponent,
    TeamPageComponent,
    TeamInviteMemberComponent,
    TeamInviteMemberPageComponent,
    TeamInviteMemberDialogComponent,
    SupportPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppTranslateModule,
    AppMaterialModule
  ],
  providers: [
    ApiService,
    UserStorageService,
    AuthControllerService,
    BookControllerService,
    BookStateControllerService,
    ChapterControllerService,
    ChapterStateControllerService,
    CommentControllerService,
    LanguageControllerService,
    NotificationControllerService,
    TeamControllerService,
    UserControllerService,
    BreakpointService,
    ConfigService,
    PageService,
    ThemePickerService,
    DialogService,
    PluralTranslatePipe,
    {
      provide: MatPaginatorIntl,
      useFactory: (translate) => {
        const service = new PaginatorIntl();
        service.injectTranslateService(translate);
        return service;
      },
      deps: [TranslateService]
    },
    AuthGuard,
    DialogGuard,
    FiltersDialogService
  ],
  entryComponents: [
    DialogComponent,
    SignInDialogComponent,
    SignUpDialogComponent,
    FiltersDialogComponent,
    NewTeamDialogComponent,
    TeamInviteMemberDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
