import { Component, OnInit, ViewChild } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { BankAccount } from '../../../shared/models/report/';
import { RandomNumber } from '../../../shared/helpers/';
import { BankAccountTableComponent } from '../../../shared/component/index';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-report-bank-account',
  templateUrl: './report-bank-account.component.html',
  styleUrls: ['./report-bank-account.component.scss']
})
export class ReportBankAccountComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  bankId = 0;
  fromDate: number;
  toDate: number;
  bankAccounts: BankAccount[] = [];
  bankCompany: Observable<Dictionary[]>;
  isSubmit = false;
  @ViewChild(BankAccountTableComponent) bankAccComponent;
  constructor(private random: RandomNumber,
    private masterDataService: MasterDataService,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
    this.bankCompany = this.masterDataService.getListCompanyBankKL();
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate) || this.bankId == 0) {
      return;
    }
    this.bankAccComponent.getReport();
  }

}
