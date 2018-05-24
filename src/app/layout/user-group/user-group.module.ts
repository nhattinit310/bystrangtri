import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserGroupRoutingModule } from './user-group-routing.module';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { SharedModule } from '../../shared/shared.module';
import { GroupCreateComponent } from './group-create/group-create.component';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GroupFormComponent } from './group-form/group-form.component';
import { GroupUpdateComponent } from './group-update/group-update.component';

@NgModule({
  imports: [
    CommonModule,
    UserGroupRoutingModule,
    SharedModule
  ],
  providers: [BsModalService],
  declarations: [GroupManagerComponent, GroupCreateComponent, GroupFormComponent, GroupUpdateComponent]
})
export class UserGroupModule { }
