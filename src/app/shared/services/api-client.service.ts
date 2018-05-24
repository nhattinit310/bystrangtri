import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { JwtService } from './jwt.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router/';


@Injectable()
export class ApiClientService {

  constructor(
    private http: HttpClient,
    private jwtService: JwtService,
    private router: Router
  ) { }

  private setHeaders(): HttpHeaders {
    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.jwtService.getToken()) {
      headersConfig['Authorization'] = `Bearer ${this.jwtService.getToken()}`;
    }
    return new HttpHeaders(headersConfig);
  }

  private formatErrors(error: any) {
    console.log(error);
    if (error.status == 401) {
      this.router.navigate(['/login']);
    }
    return Observable.throw(error);
  }

  private setSessiontimeout() {
    this.jwtService.setSessionTimeout();
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${environment.api_url}${path}`, { headers: this.setHeaders() }).timeout(120000)
      .catch(err => this.formatErrors(err))
      .map((res: HttpResponse<any>) => res);
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(err => this.formatErrors(err))
      .map((res: HttpResponse<any>) => res);
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${environment.api_url}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    )
      .catch(err => this.formatErrors(err))
      .map((res: HttpResponse<any>) => res);
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${environment.api_url}${path}`,
      { headers: this.setHeaders() }
    )
      .catch(err => this.formatErrors(err))
      .map((res: HttpResponse<any>) => res);
  }
}
