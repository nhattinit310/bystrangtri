import { Component, OnInit } from '@angular/core';
import { LocationService } from '../../shared/services/location.service';
import { PagedResult } from '../../shared/models/paged-result';
import { Notice } from '../../shared/models/notice/notice';
import { UserService } from '../../shared/services/user.service';
import { JwtService } from '../../shared/services/jwt.service';
import { Account } from '../../shared/models/accounts/account';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  pagedResult: PagedResult<Notice> = new PagedResult<Notice>();
  listTotal: Notice[];
  userId: any;
  user: Account;
  groupId: number;
  busy: Subscription;
  constructor(
    private locationService: LocationService,
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  ngOnInit() {
    this.listTotal = [];
    this.userId = this.jwtService.getUserId();
    this.userService.getAccountDetail(this.userId)
      .subscribe(data => {
        console.log(data);
        this.groupId = data.groupId;
        this.jwtService.saveUserObj(data);
        this.userService.setUserName(`${data.firstName} ${data.lastName}`);
        const pms = [];
        data.permission.forEach(e => {
          if (e.value) {
            pms.push(e.name);
          }
        });
        this.userService.setUserPermission(pms);
        this.busy = this.locationService.getNoticeListByLocation(this.groupId, 0, 3)
          // tslint:disable-next-line:no-shadowed-variable
          .subscribe(data => {
            this.pagedResult = data;
            this.pagedResult.currentPage++;
            this.listTotal = this.listTotal.concat(this.pagedResult.items);
          });
      });

  }

  viewMore() {
    this.busy = this.locationService.getNoticeListByLocation(this.groupId, this.pagedResult.currentPage, this.pagedResult.pageSize)
      .subscribe(data => {
        this.pagedResult = data;
        this.pagedResult.currentPage++;
        this.listTotal = this.listTotal.concat(this.pagedResult.items);
      });
  }

}
