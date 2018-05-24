import { Component, OnInit, ViewChild } from '@angular/core';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { Merchandise } from '../../../shared/models/phuquoc/';
import { RandomNumber } from '../../../shared/helpers/';
import { ReportService } from '../../../shared/services/report.service';
import { BehaviorSubject, Subject } from 'rxjs/';
import * as moment from 'moment';
import { PagedResult } from '../../../shared/models/paged-result';
import { DeliveryResponse } from '../../../shared/models/api-response/delivery-response';
import { DataTableDirective } from 'angular-datatables/';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';

@Component({
  selector: 'app-list-merchandise',
  templateUrl: './list-merchandise.component.html',
  styleUrls: ['./list-merchandise.component.scss']
})
export class ListMerchandiseComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  fromDate: any;
  toDate: any;
  formatDate = 'DD/MM/YYYY';
  dtTrigger: Subject<any> = new Subject();
  searchTerm$ = new BehaviorSubject<string>('');
  pagedResult: PagedResult<DeliveryResponse>;
  productId: Dictionary = {
    name: '0',
    value: ''
  };
  listProduct: Dictionary[];
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  busy: Subscription;
  isSubmit = false;
  constructor(private random: RandomNumber,
    private reportService: ReportService,
    private masterDataService: MasterDataService,
    private _localeService: BsLocaleService) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
    this.masterDataService.getListProductPQ()
      .subscribe(data => this.listProduct = data);
  }

  onBlur(data) {
    if (!data) {
      this.productId = {
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
    this.busy = this.reportService.getListDelivery(0, pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.productId.name))
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
    this.busy = this.reportService.getListDelivery(this.pagedResult.currentPage, this.pagedResult.pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.productId.name))
      .subscribe(data => {
        this.rerender(data);
      });
  }

  searchProducts(search) {
    this.masterDataService.searchProductPQ(search)
    .subscribe(data => this.listProduct = data);
  }

}
