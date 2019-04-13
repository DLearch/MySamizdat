import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { LayoutComponent } from './layout/layout.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { DialogGuard } from './guards/dialog/dialog.guard';
import { NewBookPageComponent } from './pages/new-book-page/new-book-page.component';
import { BooksPageComponent } from './pages/books-page/books-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { UpdateChapterPageComponent } from './pages/update-chapter-page/update-chapter-page.component';
import { UpdateBookPageComponent } from './pages/update-book-page/update-book-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { TeamsPageComponent } from './pages/teams-page/teams-page.component';
import { NewTeamPageComponent } from './pages/new-team-page/new-team-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { TeamInviteMemberPageComponent } from './pages/team-invite-member-page/team-invite-member-page.component';

const routes: Routes = [
    {
    path: ''
    , component: LayoutComponent
    , children: [
      { path: '', redirectTo: 'books', pathMatch: 'full' }
      , { path: 'sign-up', component: SignUpPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'sign-in', component: SignInPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'books/add', component: NewBookPageComponent }
      , { path: 'user/:user', component: UserPageComponent }
      , { path: 'books', component: BooksPageComponent }
      , { path: 'new-team', component: NewTeamPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'book/:book', component: BookPageComponent }
      , { path: 'book/:book/edit', component: UpdateBookPageComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book/:chapter', component: ChapterPageComponent }
      , { path: 'teams', component: TeamsPageComponent }
      , { path: 'team/:team/invite', component: TeamInviteMemberPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'team/:team', component: TeamPageComponent }
      , { path: 'bookmarks', redirectTo: '/books?bookmark=true' }
      , { path: 'book/:book/:chapter/edit', component: UpdateChapterPageComponent, canActivate: [AuthGuard] }
      , { path: '**', component: ErrorPageComponent, data: { error: '404', descriptionTK: 'error.page-not-found' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
