import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';
import { SharedModule } from '../shared/shared.module';
import { InputCodeComponent } from './input-code/input-code.component';
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@NgModule({
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule
  ],
  declarations: [LoginComponent, ForgotPassComponent, InputCodeComponent, ResetPassComponent]
})
export class LoginModule { }
