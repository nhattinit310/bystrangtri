import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { InputCodeComponent } from './input-code/input-code.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'forgot',
    component: ForgotPassComponent
  },
  {
    path: 'code/:email',
    component: InputCodeComponent
  },
  {
    path: 'reset/:email/:token',
    component: ResetPassComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
