import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from '../components/main/main.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { SignUpComponent } from '../components/account/sign-up/sign-up.component';
import { SignInComponent } from '../components/account/sign-in/sign-in.component';
import { AccountComponent } from '../components/account/account/account.component';
import { AuthorizationGuard } from '../guards/authorization.guard';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'sign-out', redirectTo: 'sign-in' },
  { path: 'account', component: AccountComponent, canActivate: [AuthorizationGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
