import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class JwtService {

  private storageSub = new Subject<any>();
  private themeSub = new Subject<any>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  watchTheme(): Observable<any> {
    return this.themeSub.asObservable();
  }

  getToken(): String {
    if (!window.localStorage['jwtToken']) { return null; }
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  saveUserId(id: string) {
    window.localStorage['userId'] = id;
  }

  saveUserObj(user: any) {
    window.localStorage['userObj'] = JSON.stringify(user);
  }

  getUserObj(): any {
    return JSON.parse(window.localStorage['userObj']);
  }

  getUserId(): any {
    return window.localStorage['userId'];
  }

  destroyToken() {
    window.localStorage.removeItem('jwtToken');
    window.localStorage.removeItem('userId');
    window.localStorage.removeItem('permission');
    window.localStorage.removeItem('userObj');
    window.localStorage.removeItem('username');
  }

  setSessionTimeout() {
    window.localStorage['sessionTimeout'] = true;
    this.storageSub.next(true);
  }

  setTheme(name) {
    window.localStorage['theme'] = name;
    this.themeSub.next(name);
  }

  getTheme(): Observable<any> {
    return window.localStorage['theme'];
  }
}
