import { Component, OnInit } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { CashBook } from '../../../shared/models/phuquoc/';
import { RandomNumber } from '../../../shared/helpers/';
import { Subject } from 'rxjs/Subject';
import { ReportService } from '../../../shared/services/report.service';
import * as moment from 'moment';
import { CashBookResponse } from '../../../shared/models/api-response/cashbook-response';
import { PagedResult } from '../../../shared/models/paged-result';
import { Subscription } from 'rxjs/Subscription';
import { viLocale } from '../../../shared/locale/vi';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';

@Component({
  selector: 'app-cash-book',
  templateUrl: './cash-book.component.html',
  styleUrls: ['./cash-book.component.scss']
})
export class CashBookComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  cashBooks: CashBook[] = [];
  contentArr = [
    'Thu tiền khách hàng TM/CK',
    'Thu khác TM',
    'Thu khác CK'
  ];
  targetNameArr = [
    'Khánh Thuận',
    'Việt KD',
    'Việt Trang',
    'Phúc Thịnh'
  ];
  fromDate: number;
  toDate: number;
  formatDate = 'DD/MM/YYYY';
  dtTrigger: Subject<any> = new Subject();
  pagedResult: PagedResult<CashBookResponse>;
  busy: Subscription;
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
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getCashBook(0, pageSize, moment(this.fromDate).unix(), moment(this.toDate).unix())
      .subscribe(data => {
        this.rerender(data);
      });
  }

  rerender(pagedResult: any) {
    this.pagedResult = pagedResult;
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.reportService.getCashBook(this.pagedResult.currentPage, this.pagedResult.pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix())
      .subscribe(data => {
        this.rerender(data);
      });
  }


}
