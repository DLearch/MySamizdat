import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Pages
import { MainComponent } from './pages/main/main.component';
import { AccountComponent } from './pages/account/account.component';
import { EmailConfirmationComponent } from './pages/email-confirmation/email-confirmation.component';
import { ChallengeComponent } from './pages/challenge/challenge.component';
import { PasswordSettingComponent } from './pages/password-setting/password-setting.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { ErrorComponent } from './pages/error/error.component';
import { BookComponent } from './pages/book/book.component';
import { SeriesComponent } from './pages/series/series.component';
import { UserComponent } from './pages/user/user.component';
import { BookCreatingComponent } from './pages/book-creating/book-creating.component';
import { SeriesCreatingComponent } from './pages/series-creating/series-creating.component';
import { TeamCreatingComponent } from './pages/team-creating/team-creating.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { TeamComponent } from './pages/team/team.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { SignOutComponent } from './pages/sign-out/sign-out.component';

const routes: Routes = [
  {
    path: ''
    , component: LayoutComponent
    , children: [
      { path: '', component: MainComponent }

      , { path: 'sign-in', component: SignInComponent }
      , { path: 'sign-up', component: SignUpComponent }
      , { path: 'sign-out', component: SignOutComponent }
      , { path: 'confirm-email', component: EmailConfirmationComponent }
      , { path: 'email-confirmed', component: EmailConfirmationComponent, data: { emailConfirmed: true } }
      , { path: 'email-unconfirmed', component: EmailConfirmationComponent, data: { emailConfirmed: false } }
      , { path: 'confirm-email', component: EmailConfirmationComponent }
      , { path: 'challenge', component: ChallengeComponent }
      , { path: 'setting-password', component: PasswordSettingComponent }
      , { path: 'new-password', component: PasswordSettingComponent }
      , { path: 'account', component: AccountComponent }
      , { path: 'settings', component: SettingsComponent }

      , { path: 'user/:id', component: UserComponent }

      , { path: 'add-team', component: TeamCreatingComponent }
      , { path: 'team/:id', component: TeamComponent }

      , { path: 'add-series', component: SeriesCreatingComponent }
      , { path: 'series/:id', component: SeriesComponent }

      , { path: 'add-book', component: BookCreatingComponent }
      , { path: 'book/:id', component: BookComponent }

      , { path: '**', component: ErrorComponent, data: { error: 404 } }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
