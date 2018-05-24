import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router/';
import { UserService } from '../../../shared/services/user.service';
import { Observable } from 'rxjs';
import { Account } from '../../../shared/models/accounts/account';

@Component({
  selector: 'app-account-change-pass',
  templateUrl: './account-change-pass.component.html',
  styleUrls: ['./account-change-pass.component.scss']
})
export class AccountChangePassComponent implements OnInit {

  account: Observable<Account>;
  accountId: number;
  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
    });
    this.account = this.userService.getAccountDetail(this.accountId);
  }

}
