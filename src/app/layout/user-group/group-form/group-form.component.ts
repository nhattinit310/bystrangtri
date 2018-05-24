import { Component, OnInit, Input } from '@angular/core';
import { UserGroup } from '../../../shared/models/userGroup/user-group';
import { LocationService } from '../../../shared/services/location.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit {

  constructor(private locationService: LocationService,
    private alertService: AlertService,
    private router: Router) { }
  @Input() group: UserGroup;
  isSubmited: boolean = false;
  isValid: boolean;
  ngOnInit() {
    console.log(this.group);
    this.isValid = this.group.id ? true : false;
  }

  createOrUpdate() {
    this.isSubmited = true;
    if (this.isValid) {
      this.locationService.createOrUpdateLocation(this.group)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/group']);
        if (this.group.id) {
          this.alertService.success('Cập nhật nhóm khách hàng thành công');
        } else {
          this.alertService.success('Thêm nhóm khách hàng thành công');
        }
      }, err => {
        console.log(err);
        if (err.error.errorCode == 'DuplicateLocationName') {
          this.alertService.error('Nhóm khách hàng đã tồn tại, vui lòng chọn tên khác!');
        } else {
          this.alertService.error(err.error.errorMessage);
        }
      });
    }
  }

  formChange(form) {
    if (form.valid && this.group.name.trim()) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

}
