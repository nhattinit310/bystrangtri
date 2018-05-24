import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router/';
import { Account } from '../../../shared/models/accounts/account';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-account-permission',
  templateUrl: './account-permission.component.html',
  styleUrls: ['./account-permission.component.scss']
})
export class AccountPermissionComponent implements OnInit {

  accountId: number;
  user: Account;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.accountId = params['id'];
    });
    this.userService.getAccountDetail(this.accountId)
      .subscribe(data => {
        this.user = data;
        if (this.user.isClient) {
          this.user.permission = this.user.permission.filter(i => i.name == 'General.Comment' ||
          i.name == 'Report.KL.TrackingQuantityCustomer' || i.name == 'Report.KL.Sale.Debt');
        }
      });
  }

  checkPermission(index) {
    const currentPermission = this.user.permission[index].value;
    this.user.permission[index].value = !currentPermission;
  }

  updatePermission() {
    this.userService.updatePermission(this.accountId, this.user)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/accounts']);
        this.alertService.success('Cập nhật quyền thành công');
      }, err => {
        console.log(err);
      });
  }

}
