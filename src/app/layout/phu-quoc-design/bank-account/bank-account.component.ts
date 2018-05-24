import { Component, OnInit, ViewChild } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { BankAccount } from '../../../shared/models/report/';
import { RandomNumber } from '../../../shared/helpers/';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { Observable } from 'rxjs/Observable';
import { ReportService } from '../../../shared/services/report.service';
import * as moment from 'moment';
import { PagedResult } from '../../../shared/models/paged-result';
import { BankAccountResponse } from '../../../shared/models/api-response/bank-account-response';
import { Subject } from 'rxjs/Subject';
import { BankAccountTableComponent } from '../../../shared/component/index';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss']
})
export class BankAccountComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  bankAccounts: BankAccount[] = [];
  bankCompany: Observable<Dictionary[]>;
  bankId = 0;
  fromDate: number;
  toDate: number;
  formatDate = 'DD/MM/YYYY';
  pagedResult: PagedResult<BankAccountResponse> = new PagedResult<BankAccountResponse>();
  dtTrigger: Subject<any> = new Subject();
  isSubmit = false;
  @ViewChild(BankAccountTableComponent) bankAccComponent;
  constructor(private random: RandomNumber,
    private masterDataService: MasterDataService,
    private reportService: ReportService,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
    this.bankCompany = this.masterDataService.getListCompanyBankPQ();
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate) || this.bankId == 0) {
      return;
    }
    this.bankAccComponent.getReport();
  }

}
