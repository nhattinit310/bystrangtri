import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router/';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  isWrongPass: boolean;
  constructor(private userService: UserService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.isWrongPass = false;
    const footer: any = document.getElementById('footer_page');
    footer.classList.add('login-footer');
  }

  onSubmit() {
    this.isWrongPass = false;
    this.userService.login(this.username, this.password).subscribe(data => {
      console.log(data);
      this.router.navigate(['dashboard']);
    }, err => {
      console.log(err);
      this.isWrongPass = true;
    });
  }

}
