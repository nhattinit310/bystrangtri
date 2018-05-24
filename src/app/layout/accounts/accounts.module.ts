import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { SharedModule } from '../../shared/shared.module';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountChangePassComponent } from './account-change-pass/account-change-pass.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AccountPermissionComponent } from './account-permission/account-permission.component';
import { EqualValidator } from '../../shared/directives/password-match.directive';


@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    SharedModule
  ],
  providers: [BsModalService, EqualValidator],
  declarations: [AccountManagerComponent, AccountCreateComponent, AccountFormComponent, AccountUpdateComponent, AccountChangePassComponent, AccountPermissionComponent, EqualValidator]
})
export class AccountsModule { }
