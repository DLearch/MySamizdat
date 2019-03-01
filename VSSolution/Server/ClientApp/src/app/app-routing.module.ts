import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { MainComponent } from './pages/main/main.component';
import { ErrorComponent } from './pages/error/error.component';
import { BookComponent } from './pages/book/book.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { AccountComponent } from './pages/account/account.component';
import { AuthGuard } from './auth/auth.guard';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { NewBookComponent } from './pages/new-book/new-book.component';
import { NewChapterComponent } from './pages/new-chapter/new-chapter.component';
import { BookmarksComponent } from './pages/bookmarks/bookmarks.component';

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

      , { path: 'create-book', component: NewBookComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book', component: BookComponent }

      , { path: 'book/:book/create-chapter', component: NewChapterComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book/:chapter', component: ChapterComponent, runGuardsAndResolvers: 'always' }

      , { path: 'bookmarks', component: BookmarksComponent, canActivate: [AuthGuard] }
      
      , { path: 'catalog', component: CatalogComponent }
      , { path: 'book', redirectTo: 'catalog' }

      , { path: '**', component: ErrorComponent, data: { error: 404 } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
