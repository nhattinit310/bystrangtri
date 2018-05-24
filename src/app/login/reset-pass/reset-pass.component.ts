import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router/';
import { UserService } from '../../shared/services/user.service';
import { AlertService } from '../../shared/services/alert.service';

@Component({
  selector: 'app-reset-pass',
  templateUrl: './reset-pass.component.html',
  styleUrls: ['./reset-pass.component.scss']
})
export class ResetPassComponent implements OnInit {

  email: string;
  token: string;
  password: string;
  reTypePass: string;
  isSubmit: boolean = false;
  isValid: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.email = params['email'];
      this.token = params['token'];
    });
  }

  resetPass() {
    if (!this.isSubmit) {
      this.isSubmit = true;
      if (this.isValid) {
        this.userService.resetPassword(this.email, this.token, this.password)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['/login']);
          this.alertService.success('Reset mật khẩu thành công');
        }, err => {
          console.log(err);
          this.alertService.error(err.error.errorMessage);
        });
      }
    }
  }

  formChange(form) {
    if (form.valid && this.password.trim() && this.reTypePass.trim() && (this.password == this.reTypePass)) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
    console.log(this.isValid);
  }
}
