import { Component, OnInit } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { RandomNumber } from '../../../shared/helpers/';
import * as moment from 'moment';
import { ReportService } from '../../../shared/services/report.service';
import { BusinessEffResponse } from '../../../shared/models/api-response/business-eff-response';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-business-performance',
  templateUrl: './business-performance.component.html',
  styleUrls: ['./business-performance.component.scss']
})
export class BusinessPerformanceComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  tongBanRa: number;
  tongMuaVao: number;
  hieuQua: number;
  from: any;
  to: any;
  formatDate = 'DD/MM/YYYY';
  reportData: BusinessEffResponse;
  isSubmit = false;
  constructor(private random: RandomNumber,
    private reportService: ReportService,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
  }

  getReport() {
    this.isSubmit = true;
    if (!this.from || !this.to || (this.from > this.to)) {
      return;
    }
    this.reportService.getBussinessEff(moment(this.from).unix(), moment(this.to).unix())
      .subscribe(data => {
        this.reportData = data;
      });
  }

}
