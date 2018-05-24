import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../services/user.service';
import { UserPermission } from '../../common/permission.enum';
import { Router } from '@angular/router/';
import { JwtService } from '../../services/jwt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  closeNav = false;
  isCollapseSales = true;
  isCollapsePurchase = true;
  isCollapseReport = true;
  isCollapsePQ = true;
  collapseMenu = {
    isCollapseSales: true,
    isCollapsePurchase: true,
    isCollapseReport: true,
    isCollapsePQ: true
  };
  username: Observable<any>;
  permission: Observable<any>;
  userPermission = UserPermission;

  constructor(
    private userService: UserService,
    private router: Router,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    const dom: any = document.querySelector('body');
    // default open sidebar in screen width > 1200
    // if (window.screen.width > 1200)
    dom.classList.add('push-right');
    const footer: any = document.getElementById('footer_page');
    footer.classList.add('push-right');
    // this.toggleMenu();
    this.username = this.userService.getUsername();
    this.userService.watchStorage()
      .subscribe(data => {
        this.username = data;
      });
    this.permission = this.userService.getUserPermission();
    this.userService.watchPermissionStorage()
      .subscribe(data => {
        this.permission = data;
      });
  }

  toggleNav() {
    const footer: any = document.getElementById('footer_page');
    if (!this.closeNav) {
      const dom: any = document.querySelector('body');
      dom.classList.remove('push-right');
      footer.classList.remove('push-right');
      footer.classList.add('login-footer');
      this.closeNav = !this.closeNav;
    } else {
      const dom: any = document.querySelector('body');
      dom.classList.add('push-right');
      footer.classList.add('push-right');
      footer.classList.remove('login-footer');
      this.closeNav = !this.closeNav;
    }
  }

  toggleMenu(menuName) {
    // khi open 1 menu thì close tất cả menu còn lại
    const currentStatus = this.collapseMenu[menuName];
    // tslint:disable-next-line:forin
    for (const menu in this.collapseMenu) {
      this.collapseMenu[menu] = true;
    }
    this.collapseMenu[menuName] = !currentStatus;
  }

  logout() {
    this.userService.logout()
      .subscribe(data => {
        console.log(data);
        this.jwtService.destroyToken();
        this.router.navigate(['/login']);
      });
  }

}
