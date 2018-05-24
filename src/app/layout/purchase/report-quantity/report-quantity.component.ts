import { Component, OnInit } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { PurchaseQuantity } from '../../../shared/models/purchase/';
import { RandomNumber } from '../../../shared/helpers/';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { Observable, BehaviorSubject, Subject, Subscription } from 'rxjs/';
import { ReportService } from '../../../shared/services/report.service';
import * as moment from 'moment';
import { PagedResult } from '../../../shared/models/paged-result';
import { QuantitySupplierResponse } from '../../../shared/models/api-response/quantity-supplier-response';
import { QuantitySupplier } from '../../../shared/models/quantity-supplier';
import { List } from 'linqts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-report-quantity',
  templateUrl: './report-quantity.component.html',
  styleUrls: ['./report-quantity.component.scss']
})
export class ReportQuantityComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  purchaseQuantitys: PurchaseQuantity[] = [];
  dtTrigger: Subject<any> = new Subject();
  busy: Subscription;
  fromDate: any;
  toDate: any;
  supplierId: Dictionary;
  bsConfig = DATEPICKER_CONFIG;
  listSupplier: Dictionary[];
  pagedResult: PagedResult<QuantitySupplierResponse> = new PagedResult<QuantitySupplierResponse>();
  listQuantitySupplier: QuantitySupplier[];
  searchTerm$ = new BehaviorSubject<string>('');
  isSearch = false;
  isSubmit = false;
  constructor(
    private random: RandomNumber,
    private masterDataService: MasterDataService,
    private reportService: ReportService,
    private _localeService: BsLocaleService
  ) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
    this.masterDataService.getListSupplier()
      .subscribe(data => {
        this.listSupplier = data;
      });
    this.supplierId = {
      name: '0',
      value: ''
    };
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  onBlur(data) {
    if (!data) {
      this.supplierId = {
        name: '0',
        value: ''
      };
    }
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getQuantitySupplier(moment(this.fromDate).unix(), moment(this.toDate).unix(),
      Number.parseInt(this.supplierId.name), 0, pageSize, this.searchTerm$)
      .subscribe(data => {
        console.log(data);
        this.isSearch = true;
        this.rerender(data);
      });
  }

  rerender(pagedResult: any) {
    this.pagedResult = pagedResult;
    this.listQuantitySupplier = [];
    const listLinQ = new List<QuantitySupplierResponse>(this.pagedResult.items);
    const listGroupBy = listLinQ.GroupBy(i => i.supplierName, m => m);
    // tslint:disable-next-line:forin
    for (const key in listGroupBy) {
      const sumGroupBy = new List<QuantitySupplierResponse>(listGroupBy[key]);
      listGroupBy[key].forEach(element => {
        const obj = new QuantitySupplier();
        obj.productName = element.productName;
        obj.quantity = element.quantity;
        obj.supplierName = element.supplierName;
        obj.supplierNo = element.supplierNo;
        this.listQuantitySupplier.push(obj);
      });
      const objSum = new QuantitySupplier();
      objSum.quantity = Math.round(sumGroupBy.Sum(i => i.quantity) * 1000) / 1000;
      this.listQuantitySupplier.push(objSum);
    }
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.reportService.getQuantitySupplier(moment(this.fromDate).unix(), moment(this.toDate).unix(),
      Number.parseInt(this.supplierId.name), this.pagedResult.currentPage, this.pagedResult.pageSize, this.searchTerm$)
      .subscribe(data => {
        this.rerender(data);
      });
  }

  searchSuppliers(name) {
    this.masterDataService.searchSupplier(name)
      .subscribe(data => {
        this.listSupplier = data;
      });
  }

}
