import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-input-code',
  templateUrl: './input-code.component.html',
  styleUrls: ['./input-code.component.scss']
})
export class InputCodeComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router,
    private userService: UserService) { }
  email: string;
  wrongCode: boolean;
  ngOnInit() {
    const footer: any = document.getElementById('footer_page');
    footer.classList.add('login-footer');
    this.route.params.subscribe(params => {
      this.email = params['email'];
    });
  }

  validateActiveCode(number1, number2, number3, number4, number5, number6) {
    const activeCode = `${number1}${number2}${number3}${number4}${number5}${number6}`;
    this.wrongCode = false;
    this.userService.validateActiveCode(activeCode, this.email)
      .subscribe(data => {
        console.log(data);
        this.router.navigate(['/login/reset', this.email, data]);
      }, err => {
        console.log(err);
        if (err.error.errorCode == 'ActionFailed') {
          this.wrongCode = true;
        }
      });
  }

}
