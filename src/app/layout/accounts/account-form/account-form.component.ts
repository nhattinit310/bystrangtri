import { Component, OnInit, Input } from '@angular/core';
import { Account } from '../../../shared/models/accounts/account';
import { PermissionArr } from '../../../shared/common/default-permission';
import { Status } from '../../../shared/common/status.enum';
import { UserService } from '../../../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router/';
import { AlertService } from '../../../shared/services/alert.service';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { Observable } from 'rxjs/Observable';
import { MasterDataService } from '../../../shared/services/master-data.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {
  customersSearchResults: Dictionary[];
  @Input() isCreate: boolean;
  isClient = false;
  @Input() user: Account;
  locationList: Observable<Dictionary[]>;
  customerList: Observable<Dictionary[]>;
  isSubmited = false;
  @Input() isValid: boolean;
  customerId: Dictionary = {
    name: '0',
    value: ''
  };
  listCustomer: Dictionary[];
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private masterDataService: MasterDataService,
    private router: Router) { }

  ngOnInit() {
    this.locationList = this.masterDataService.getListLocation();
    this.masterDataService.getListCustomer()
      .subscribe(data => {
        this.listCustomer = data;
        if (this.user.client) {
          this.customerId = {
            name: this.user.client,
            value: data.find(i => i.name == this.user.client).value
          };
        }
      });
    if (this.user.id) {
      this.showHideClientPermission(!this.user.isClient);
    }
  }

  onFormChange(form) {
    if (form.valid && this.user.firstName.trim() && this.user.lastName.trim()
      && this.user.email.trim() && this.user.userName.trim() && (this.user.password == this.user.reTypePass)) {
      if (this.user.isClient) {
        // if (this.user.client != '' && this.user.groupId != 0) {
        //   this.isValid = true;
        // } else {
        //   this.isValid = false;
        // }
      } else {
        this.isValid = true;
      }
    } else {
      this.isValid = false;
    }
    console.log(this.isValid);
  }

  createOrUpdate() {
    this.isSubmited = true;
    if (this.isValid) {
      this.userService.createOrUpdateAccount(this.user)
        .subscribe(data => {
          this.router.navigate(['/accounts']);
          if (!this.user.id) {
            this.alertService.success('Thêm tài khoản thành công');
          } else {
            this.alertService.success('Cập nhật tài khoản thành công');
          }
        }, err => {
          if (err.error.errorCode === 'DuplicateUserName') {
            const msg = `Tên tài khoản ${this.user.userName} đã tồn tại!`;
            this.alertService.error(msg);
          }
          if (err.error.errorCode === 'InvalidUserName') {
            const msg = `Tên tài khoản ${this.user.userName} không hợp lệ! `;
            this.alertService.error(msg);
          }
          if (err.error.errorCode === 'DuplicateEmail') {
            const msg = `Email ${this.user.email} đã tồn tại! `;
            this.alertService.error(msg);
          }
        });
    }
  }

  checkPermission(index) {
    const currentPermission = this.user.permission[index].value;
    this.user.permission[index].value = !currentPermission;
  }

  onSelect(value) {
    this.user.client = value.name;
    this.isValid = true;
  }

  onBlur(value) {
    if (!value) {
      this.user.client = '';
      this.isValid = false;
    } else {
      this.isValid = true;
    }
  }

  showHideClientPermission(isClient) {
    if (!isClient) {
      this.user.permission.forEach(e => {
        if (e.name == 'General.Comment' || e.name == 'Report.KL.TrackingQuantityCustomer' || e.name == 'Report.KL.Sale.Debt') {
          e.showWithClient = true;
        } else {
          e.showWithClient = false;
        }
      });
    } else {
      this.user.permission.forEach(e => {
        e.showWithClient = true;
      });
    }
  }

  isClientChange(isClient) {
    // tạo mới khách hàng, nếu chọn là khách hàng thì mặc định nhóm Kiên Lương
    if (!this.user.isClient && !this.user.id) {
      this.user.groupId = 1;
    }
    this.showHideClientPermission(this.user.isClient);
    this.user.isClient = !this.user.isClient;
  }

  searchCustomers(query) {
    this.masterDataService.searchCustomer(query)
      .subscribe(result => {
        this.listCustomer = result;
      });
  }
}
