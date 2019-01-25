import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { SignUpComponent } from '../components/account/sign-up/sign-up.component';
import { SignInComponent } from '../components/account/sign-in/sign-in.component';
import { AccountComponent } from '../components/account/account/account.component';
import { AuthorizationGuard } from '../guards/authorization.guard';
import { PasswordChangeComponent } from '../components/account/password-change/password-change.component';
import { ConfirmEmailComponent } from '../components/account/confirm-email/confirm-email.component';
import { EmailConfirmedComponent } from '../components/account/email-confirmed/email-confirmed.component';
import { EmailUnconfirmedComponent } from '../components/account/email-unconfirmed/email-unconfirmed.component';
import { TeamComponent } from '../components/team/team/team.component';
import { NewTeamComponent } from '../components/team/new-team/new-team.component';

const routes: Routes = [
  { path: '', component: MainComponent },

  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-out', redirectTo: 'sign-in' },
  { path: 'account', component: AccountComponent, canActivate: [AuthorizationGuard] },
  { path: 'confirm-email', component: ConfirmEmailComponent },
  { path: 'email-confirmed', component: EmailConfirmedComponent, canActivate: [AuthorizationGuard] },
  { path: 'email-unconfirmed', component: EmailUnconfirmedComponent },
  { path: 'change-password', component: PasswordChangeComponent, canActivate: [AuthorizationGuard] },

  { path: 'team/:id', component: TeamComponent },
  { path: 'create-team', component: NewTeamComponent },

  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)]
  , exports: [RouterModule]
})
export class AppRoutingModule { }
