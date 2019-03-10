import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { MainComponent } from './pages/main/main.component';
import { ErrorComponent } from './pages/error/error.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { NewChapterComponent } from './pages/new-chapter/new-chapter.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';
import { NewTeamComponent } from './pages/new-team/new-team.component';
import { TeamComponent } from './pages/team/team.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { BookPageComponent } from './pages/book-page/book-page.component';

const routes: Routes = [
  {
    path: ''
    , component: DefaultLayoutComponent
    , children: [
      { path: '', component: MainComponent }
        
      , { path: 'sign-in', component: SignInComponent, canActivate: [AuthGuard] }
      , { path: 'sign-up', component: SignUpComponent, canActivate: [AuthGuard] }
      , { path: 'confirm-email', component: ErrorComponent, canActivate: [AuthGuard]  }

      , { path: 'account', component: AccountComponent, canActivate: [AuthGuard] }
      //, { path: 'users/:userName', component:  }

      , { path: 'create-team', component: NewTeamComponent, canActivate: [AuthGuard] }
      , { path: 'team/:team', component: TeamComponent }

      , { path: 'create-book', component: NewBookComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book', component: BookPageComponent }

      , { path: 'book/:book/create-chapter', component: NewChapterComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book/:chapter', component: ChapterComponent, runGuardsAndResolvers: 'always' }

      , { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] }

      , { path: 'catalog', component: CatalogPageComponent }
      , { path: 'book', redirectTo: 'catalog' }

      , { path: '**', component: ErrorComponent, data: { errorTK: '404', descriptionTK: 'error.page-not-found' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
