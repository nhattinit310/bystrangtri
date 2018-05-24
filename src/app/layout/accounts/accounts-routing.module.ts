import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AccountCreateComponent } from './account-create/account-create.component';
import { AccountUpdateComponent } from './account-update/account-update.component';
import { AccountChangePassComponent } from './account-change-pass/account-change-pass.component';
import { AccountPermissionComponent } from './account-permission/account-permission.component';

const routes: Routes = [
  {
    path: '',
    component: AccountManagerComponent
  },
  {
    path: 'create',
    component: AccountCreateComponent
  },
  {
    path: 'update/:id',
    component: AccountUpdateComponent
  },
  {
    path: 'change-pass/:id',
    component: AccountChangePassComponent
  },
  {
    path: 'permission/:id',
    component: AccountPermissionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
