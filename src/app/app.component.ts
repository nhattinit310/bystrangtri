import { Component } from '@angular/core';
import * as moment from 'moment';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { viLocale } from './shared/locale/vi';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private _localeService: BsLocaleService) {
    moment.locale('vi');
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
  }
  title = 'app';
}
