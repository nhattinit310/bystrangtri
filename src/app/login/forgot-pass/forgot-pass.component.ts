import { Component, OnInit } from '@angular/core';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router/';

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent implements OnInit {
  apiError: string;
  email: string;
  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    const footer: any = document.getElementById('footer_page');
    footer.classList.add('login-footer');
  }

  sendEmail() {
    this.userService.getActiveCode(this.email)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/login/code', this.email]);
      }, err => {
        console.log(err);
        if (err.error.errorCode == 'ActionFailed') {
          this.apiError = 'Địa chỉ email không tồn tại trong hệ thống!';
        } else {
          this.apiError = 'Đã có lỗi xảy ra, vui lòng thử lại!';
        }
      });
  }
}
