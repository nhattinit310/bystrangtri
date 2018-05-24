import { Component, OnInit } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { PurchaseDebt } from '../../../shared/models/purchase/';
import { RandomNumber } from '../../../shared/helpers/';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { ReportService } from '../../../shared/services/report.service';
import { Observable, Subject, Subscription } from 'rxjs/';
import { Dictionary } from '../../../shared/models/dictionary.model';
import * as moment from 'moment';
import { PagedResult } from '../../../shared/models/paged-result';
import { DebtSupplierResponse } from '../../../shared/models/api-response/debt-supplier-response';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-report-debt',
  templateUrl: './report-debt.component.html',
  styleUrls: ['./report-debt.component.scss']
})
export class ReportDebtComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  purchaseDebts: PurchaseDebt[] = [];

  bsConfig = DATEPICKER_CONFIG;
  nameArr = [
    'Cty CP bao bì Hà Tiên',
    'Cty CP SX VLXD Kiên Giang',
    'Chi phí hoạt động kinh doanh'
  ];
  totalArise = 0;
  totalAriseDebt = 0;
  totalBeginning = 0;
  totalBeginningDebt = 0;
  totalLast = 0;
  totalLaseDebt = 0;
  fromDate: any;
  toDate: any;
  supplierId: Dictionary = {
    name: '0',
    value: ''
  };
  listSupplier: Dictionary[];
  pagedResult: PagedResult<DebtSupplierResponse>;
  dtTrigger: Subject<any> = new Subject();
  busy: Subscription;
  metaData: any; // tổng cộng đầu kỳ, phát sinh, cuối kỳ
  isSubmit = false;

  constructor(private random: RandomNumber,
    private masterDataService: MasterDataService,
    private reportService: ReportService,
    private _localeService: BsLocaleService
  ) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
    this.masterDataService.getListSupplier()
      .subscribe(data => this.listSupplier = data);
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getReportDebtSupplier(0, pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.supplierId.name))
      .subscribe(data => {
        this.pagedResult = data;
        this.rerender(data);
      });
    // this.getMetaData();
  }

  onBlur(data) {
    if (!data) {
      this.supplierId = {
        name: '0',
        value: ''
      };
    }
  }

  getMetaData() {
    this.busy = this.reportService.getReportDebtSupplierMetaData(moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.supplierId.name))
      .subscribe(data => {
        console.log(data);
        this.metaData = data;
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
    this.busy = this.reportService.getReportDebtSupplier(this.pagedResult.currentPage,
      this.pagedResult.pageSize, moment(this.fromDate).unix(), moment(this.toDate).unix(), Number.parseInt(this.supplierId.name))
      .subscribe(data => {
        this.rerender(data);
      });
    // this.getMetaData();
  }

  searchSuppliers(name) {
    this.masterDataService.searchSupplier(name)
      .subscribe(data => {
        this.listSupplier = data;
      });
  }

}
