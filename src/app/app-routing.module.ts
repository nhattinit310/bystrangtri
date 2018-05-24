import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './layout/layout.module#LayoutModule',
    // canActivate: [AuthGuard]

  },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  // { path: 'signup', loadChildren: './signup/signup.module#SignupModule' },
  // { path: 'password', loadChildren: './password/password.module#PasswordModule' },
  // { path: 'not-found', loadChildren: './not-found/not-found.module#NotFoundModule' },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
