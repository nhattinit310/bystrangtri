import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.scss']
})
export class ChangePassComponent implements OnInit {

  currentPass = '';
  newPass = '';
  reTypePass = '';
  isSubmit = false;
  constructor(private userService: UserService,
    private alertService: AlertService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.currentPass.trim() && this.newPass.trim() && this.reTypePass.trim() && (this.newPass == this.reTypePass)) {
      this.userService.changePassword(this.currentPass, this.newPass)
      .subscribe(data => {
        this.alertService.success('Đổi mật khẩu thành công');
        this.newPass = '';
        this.currentPass = '';
        this.reTypePass = '';
        this.isSubmit = false;
      }, err => {
        if (err.error.errorCode == 'PasswordMismatch') {
          this.alertService.success('Mật khẩu hiện tại không đúng');
          this.newPass = '';
          this.currentPass = '';
          this.reTypePass = '';
        }
      });
    }
  }

}
