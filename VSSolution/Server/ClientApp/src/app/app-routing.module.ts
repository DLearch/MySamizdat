import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout/default-layout/default-layout.component';
import { MainComponent } from './pages/main/main.component';
import { ErrorComponent } from './pages/error/error.component';
import { AuthGuard } from './services/auth-guard/auth.guard';
import { EmailConfirmationGuard } from './services/email-confirmation-guard/email-confirmation.guard';
import { BookComponent } from './pages/book/book.component';
import { BookCreatingComponent } from './pages/book-creating/book-creating.component';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { ChapterComponent } from './pages/chapter/chapter.component';
import { ChapterCreatingComponent } from './pages/chapter-creating/chapter-creating.component';

const routes: Routes = [
  {
    path: ''
    , component: DefaultLayoutComponent
    , children: [
      { path: '', component: MainComponent }

      , { path: 'confirm-email', component: MainComponent, canActivate: [EmailConfirmationGuard] }

      , { path: 'create-book', component: BookCreatingComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book/create-chapter', component: ChapterCreatingComponent, canActivate: [AuthGuard] }
      , { path: 'book/:book/:chapter', component: ChapterComponent }
      , { path: 'book/:book', component: BookComponent }
      , { path: 'catalog/:page', component: CatalogComponent }
      , { path: 'catalog', component: CatalogComponent }
      , { path: 'book', redirectTo: 'catalog' }

      , { path: '**', component: ErrorComponent, data: { error: 404 } }
    ]
  }
//  {
//    path: 'auth'
//    , component: MboxComponent
//    , children: [
//      { path: 'sign-in', component: SignInComponent }
//      , { path: 'sign-up', component: SignUpComponent }
//      , { path: 'sign-out', component: SignOutComponent }
//      , { path: 'confirm-email', component: EmailConfirmationComponent }
//      , { path: 'email-confirmed', component: EmailConfirmationComponent, data: { emailConfirmed: true } }
//      , { path: 'email-unconfirmed', component: EmailConfirmationComponent, data: { emailConfirmed: false } }
//      , { path: 'confirm-email', component: EmailConfirmationComponent }
//    ]
//  }
//  , {
//    path: ''
//    , component: LayoutComponent
//    , children: [
//      { path: '', component: MainComponent }

//      , { path: 'challenge', component: ChallengeComponent }
//      , { path: 'setting-password', component: PasswordSettingComponent }
//      , { path: 'new-password', component: PasswordSettingComponent }
//      , { path: 'account', component: AccountComponent }
//      , { path: 'settings', component: SettingsComponent }

//      , { path: 'user/:id', component: UserComponent }

//      , { path: 'add-team', component: TeamCreatingComponent }
//      , { path: 'team/:id', component: TeamComponent }

//      , { path: 'add-series', component: SeriesCreatingComponent }
//      , { path: 'series/:id', component: SeriesComponent }

//      , { path: 'add-book', component: BookCreatingComponent }
//      , { path: 'book/:id', component: BookComponent }

//      , { path: '**', component: ErrorComponent, data: { error: 404 } }
//    ]
//  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
