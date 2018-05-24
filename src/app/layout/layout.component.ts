import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router/';
import { JwtService } from '../shared/services/jwt.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(private router: Router,
    private jwtService: JwtService,
    private userService: UserService) { }

  ngOnInit() {
    const footer: any = document.getElementById('section-layout');
    this.userService.getTheme()
      .subscribe(data => {
        if (data) {
          footer.style = `background-image: url("data:image/jpeg;base64,${data}"); background-size: cover`;
        }
      });
    this.jwtService.watchTheme()
      .subscribe(data => {
        footer.style = `background-image: url("data:image/jpeg;base64,${data}"); background-size: cover`;
      });
    if (this.router.url === '/' || this.router.url === '/#/') {
      this.router.navigate(['/dashboard']);
    }
  }

}
