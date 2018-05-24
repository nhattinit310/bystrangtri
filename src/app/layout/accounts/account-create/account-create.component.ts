import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountFormComponent } from '../account-form/account-form.component';
import { Status } from '../../../shared/common/status.enum';
import { PermissionArr } from '../../../shared/common/default-permission';
import { Account } from '../../../shared/models/accounts/account';

@Component({
  selector: 'app-account-create',
  templateUrl: './account-create.component.html',
  styleUrls: ['./account-create.component.scss']
})
export class AccountCreateComponent implements OnInit {

  pms = PermissionArr;
  @ViewChild(AccountFormComponent) formComponent;
  user: Account;
  constructor() { }
  ngOnInit() {
    this.pms.forEach(e => {
      e.value = false;
      e.showWithClient = true;
    });
    this.user = {
      id: null,
      check: false,
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      reTypePass: '',
      group: '',
      number: '',
      status: Status.Active,
      permission: this.pms,
      client: '',
      isClient: false,
      groupId: 0
    };
  }

  createUser() {
    this.formComponent.createOrUpdate();
  }

}
