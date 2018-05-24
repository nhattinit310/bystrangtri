import { Component, OnInit, ViewChild } from '@angular/core';
import { Account } from '../../../shared/models/accounts/account';
import { UserService } from '../../../shared/services/user.service';
import { ApiConvertHelper } from '../../../shared/helpers/api-convert.helper';
import { ActivatedRoute } from '@angular/router/';
import { Observable } from 'rxjs/Observable';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-account-update',
  templateUrl: './account-update.component.html',
  styleUrls: ['./account-update.component.scss']
})
export class AccountUpdateComponent implements OnInit {

  account: Observable<Account>;
  accountId: number;
  @ViewChild(AccountFormComponent) formComponent;

  constructor(private userService: UserService,
    private apiConvert: ApiConvertHelper,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
    });
    this.account = this.userService.getAccountDetail(this.accountId);
  }

  updateUser() {
    this.formComponent.createOrUpdate();
  }

}
