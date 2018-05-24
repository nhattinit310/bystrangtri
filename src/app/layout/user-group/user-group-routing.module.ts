import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { GroupCreateComponent } from './group-create/group-create.component';
import { GroupUpdateComponent } from './group-update/group-update.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'manager'
  },
  {
    path: 'manager',
    component: GroupManagerComponent
  },
  {
    path: 'create',
    component: GroupCreateComponent
  },
  {
    path: 'update/:id',
    component: GroupUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserGroupRoutingModule { }
