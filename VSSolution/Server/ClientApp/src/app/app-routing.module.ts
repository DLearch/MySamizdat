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

const routes: Routes = [
  {
    path: ''
    , component: LayoutComponent
    , children: [
      { path: '', component: MainPageComponent }
      , { path: 'sign-up', component: SignUpPageComponent, canActivate: [AuthGuard] }
      , { path: 'sign-in', component: SignInPageComponent, canActivate: [AuthGuard] }
      , { path: 'add-book', component: NewBookPageComponent, canActivate: [AuthGuard] }
      , { path: 'book-not-found', component: ErrorPageComponent, data: { error: '404', descriptionTK: 'error.book-not-found' } }
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
