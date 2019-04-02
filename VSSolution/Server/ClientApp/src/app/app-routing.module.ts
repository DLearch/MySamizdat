import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { ErrorPageComponent } from './pages/error-page/error-page.component';
import { AuthGuard } from './guards/auth/auth.guard';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { NewBookPageComponent } from './pages/new-book-page/new-book-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';
import { ChapterPageComponent } from './pages/chapter-page/chapter-page.component';
import { DialogGuard } from './guards/dialog/dialog.guard';
import { BookCatalogPageComponent } from './pages/book-catalog-page/book-catalog-page.component';
import { BookmarksPageComponent } from './pages/bookmarks-page/bookmarks-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { NewTeamPageComponent } from './pages/new-team-page/new-team-page.component';
import { TeamPageComponent } from './pages/team-page/team-page.component';
import { InviteTeamMemberPageComponent } from './pages/invite-team-member-page/invite-team-member-page.component';
import { UserTeamsPageComponent } from './pages/user-teams-page/user-teams-page.component';

const routes: Routes = [
  {
    path: ''
    , component: LayoutComponent
    , children: [
      { path: '', component: MainPageComponent }
      , { path: 'sign-up', component: SignUpPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'sign-in', component: SignInPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'new-team', component: NewTeamPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'books/add', component: NewBookPageComponent, canActivate: [AuthGuard] }
      , { path: 'team/:team/invite', component: InviteTeamMemberPageComponent, canActivate: [AuthGuard, DialogGuard] }
      , { path: 'user/:user/teams', component: UserTeamsPageComponent }
      , { path: 'books', component: BookCatalogPageComponent }
      , { path: 'team/:team', component: TeamPageComponent }
      , { path: 'bookmarks', component: BookmarksPageComponent, canActivate: [AuthGuard] }
      , { path: 'user/:user', component: UserPageComponent }
      , { path: 'book/:book', component: BookPageComponent }
      , { path: 'book/:book/:chapter', component: ChapterPageComponent }
      , { path: '**', component: ErrorPageComponent, data: { error: '404', descriptionTK: 'error.page-not-found' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
