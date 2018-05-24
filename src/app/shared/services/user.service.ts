import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { Http } from '@angular/http/';
import { Observable, Subject } from 'rxjs/';
import { ApiClientService } from './api-client.service';
import { Account } from '../models/accounts/account';
import { ApiConvertHelper } from '../helpers/api-convert.helper';
import { AccountResponse } from '../models/api-response/account-response';
import { Status } from '../common/status.enum';
import { InstantSearchService } from './instant-search.service';
import { PagedResult } from '../models/paged-result';

@Injectable()
export class UserService {

  private storageSub = new Subject<any>();
  private storageSubPermission = new Subject<any>();

  constructor(
    private apiService: ApiClientService,
    private jwtService: JwtService,
    private apiConvert: ApiConvertHelper,
    private instantSearchService: InstantSearchService
  ) { }

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  watchPermissionStorage(): Observable<any> {
    return this.storageSubPermission.asObservable();
  }

  login(userName: string, password: string): Observable<any> {
    const url = `user/login`;
    return this.apiService.post(url, {
      'userName': userName,
      'password': password
    }).map(data => {
      this.jwtService.saveToken(data.result.accessToken);
      this.jwtService.saveUserId(data.result.userId);
      return data.result;
    });
  }

  logout() {
    const url = `user/logout`;
    return this.apiService.post(url)
      .map(data => data);
  }


  // tạo mới/update account
  createOrUpdateAccount(account: Account): Observable<any> {
    const accountRequest = this.apiConvert.AccountRequestConvert(account);
    const url = account.id ? `user/edit` : `user/create`;
    console.log(accountRequest);
    return this.apiService.post(url, accountRequest)
      .map(data => data);
  }

  // get danh sách account
  getListAccounts(terms: Observable<string>, page: number, pageSize: number): Observable<PagedResult<Account>> {
    const url = `user/list/${page}/${pageSize}`;
    // return this.instantSearchService.search(url, terms)
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []).map(this.apiConvert.AccountConvert),
          extraData: result.extraData && result.extraData[0]
        };
      });
  }

  // get chi tiết account
  getAccountDetail(id: number): Observable<Account> {
    const url = `user/${id}`;
    return this.apiService.get(url)
      .map(data => this.apiConvert.AccountConvert(data.result));
  }

  // đổi mật khẩu account
  changePassword(current: string, newPass: string): Observable<any> {
    const url = `user/password/change`;
    return this.apiService.post(url, {
      'currentPassword': current,
      'newPassword': newPass
    }).map(data => data);
  }

  // active/deactive account
  activeOrDeactive(id: number, status: string): Observable<any> {
    const url = status === Status.Active ? `user/deactive` : `user/active`;
    return this.apiService.post(url, {
      'id': id
    }).map(data => data);
  }

  // delete account
  deleteAcc(id: number): Observable<any> {
    const url = `user/delete`;
    return this.apiService.post(url, {
      'id': id
    }).map(data => data);
  }

  // delete multi account
  deleteMultiAcc(id: any): Observable<any> {
    const url = `user/delete-multi`;
    return this.apiService.post(url, {
      'ids': id
    }).map(data => data);
  }

  // update permission
  updatePermission(id: number, account: Account): Observable<any> {
    const url = `user/permission/change`;
    const pms = [];
    account.permission.forEach(element => {
      if (element.value) {
        pms.push(element.name);
      }
    });
    return this.apiService.post(url, {
      'userId': id,
      permissions: pms
    }).map(data => data);
  }

  // get active code reset password
  getActiveCode(email: string): Observable<any> {
    const url = `user/password/getactivecode?email=${email}`;
    return this.apiService.get(url)
      .map(data => data);
  }

  // validate active code
  validateActiveCode(code: string, email: string): Observable<any> {
    const url = `user/password/validateactivecode?email=${email}&activeCode=${code}`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  // reset password
  resetPassword(email: string, token: string, password: string): Observable<any> {
    const url = `user/password/reset`;
    return this.apiService.post(url, {
      'email': email,
      'token': token,
      'password': password
    }).map(data => data);
  }

  // get theme
  getTheme(): Observable<any> {
    const url = `user/me/theme`;
    return this.apiService.get(url)
      .map(data => data.result.backgroundImage);
  }

  setTheme(name): Observable<any> {
    const url = `user/me/changetheme`;
    return this.apiService.post(url, {
      'backgroundImage': name
    });
  }

  setUserName(name: any) {
    window.localStorage.removeItem('username');
    window.localStorage['username'] = name;
    this.storageSub.next(name);
  }

  getUsername(): Observable<any> {
    return window.localStorage['username'];
  }

  setUserPermission(pms: any) {
    window.localStorage.removeItem('permission');
    window.localStorage['permission'] = pms;
    this.storageSubPermission.next(pms);
  }

  getUserPermission(): Observable<any> {
    return window.localStorage['permission'];
  }

}
