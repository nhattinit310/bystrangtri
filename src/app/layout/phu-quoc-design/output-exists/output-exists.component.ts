import { Component, OnInit } from '@angular/core';
import { DATEPICKER_CONFIG, DATATABLE_CONFIG } from '../../../shared/configs/';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale, listLocales, getSetGlobalLocale } from 'ngx-bootstrap/chronos';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '../../../shared/models/dictionary.model';
// import { ViLocale } from '../../../shared/locale/vi.locale';
import * as moment from 'moment';
import { ReportService } from '../../../shared/services/report.service';
import { ReceiptShipmentResponse } from '../../../shared/models/api-response/receipt-shipment-response';
import { PagedResult } from '../../../shared/models/paged-result';
import { List } from 'linqts';
import { ReceiptShipment } from '../../../shared/models/phuquoc/receipt-shipment';
import { element } from 'protractor';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { viLocale } from '../../../shared/locale/vi';


@Component({
  selector: 'app-output-exists',
  templateUrl: './output-exists.component.html',
  styleUrls: ['./output-exists.component.scss']
})
export class OutputExistsComponent implements OnInit {

  bsConfig = DATEPICKER_CONFIG;
  dtOptions = DATATABLE_CONFIG;
  isShowIT = true;
  isShowVLXD = true;
  isShowMT = false;
  isShowPK = false;
  isShowDinh = false;
  isShowGach = false;
  isShowSat = false;
  locales = listLocales();
  listProduct: Dictionary[];
  fromDate: number;
  toDate: number;
  formatDate = 'DD/MM/YYYY';
  productId: Dictionary = {
    name: '0',
    value: ''
  };
  pagedResult: PagedResult<ReceiptShipmentResponse>;
  dtTrigger: Subject<any> = new Subject();
  listReceiptShipment: ReceiptShipment[];
  busy: Subscription;
  metaData: any;
  isSubmit = false;
  constructor(private _localeService: BsLocaleService,
    private masterDataService: MasterDataService,
    private reportService: ReportService) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    this.dtOptions.ordering = false; // ko order table này
    window.scrollTo(0, 0);
    this.masterDataService.getListProductPQ()
      .subscribe(data => this.listProduct = data);
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getReceiptShipment(0, pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.productId.name))
      .subscribe(data => {
        this.rerender(data);
      });
  }

  onBlur(data) {
    if (!data) {
      this.productId = {
        name: '0',
        value: ''
      };
    }
  }

  rerender(pagedResult: any) {
    this.listReceiptShipment = [];
    this.pagedResult = pagedResult;
    const listLintQ = new List<ReceiptShipmentResponse>(this.pagedResult.items);
    const listDepartment = listLintQ.GroupBy(i => i.departmentName, m => m);
    // tslint:disable-next-line:forin
    for (const key in listDepartment) {
      const obj = new ReceiptShipment();
      obj.type = 'Department';
      obj.collapse = false;
      this.listReceiptShipment.push(obj);
      obj.description =  key;
      const listDepartmentLinQ = new List<ReceiptShipmentResponse>(listDepartment[key]);
      const listProductGroup = listDepartmentLinQ.GroupBy(i => i.productGroupName, m => m);
      // tslint:disable-next-line:forin
      for (const key1 in listProductGroup) {
        const obj1 = new ReceiptShipment();
        obj1.description = key1;
        obj1.type = 'ProductGroup';
        obj1.department = key;
        obj1.show = true;
        obj1.collapse = false;
        this.listReceiptShipment.push(obj1);
        listProductGroup[key1].forEach(element => {
          const obj2 = new ReceiptShipment();
          obj2.description = element.productName;
          obj2.stockCardOpeningBalanceAmount = element.stockCardOpeningQty;
          obj2.stockCardEndBalanceAmount = element.stockCardEndQty;
          obj2.stockCardReceiptItemProductQty = element.stockCardReceiptItemProductQty;
          obj2.stockCardShipmentItemProductQty = element.stockCardShipmentItemProductQty;
          obj2.measureUnitName = element.measureUnitName;
          obj2.type = 'Product';
          obj2.show = true;
          obj2.groupName = key1;
          obj2.department = key;
          this.listReceiptShipment.push(obj2);
        });
      }
    }
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.reportService.getReceiptShipment(this.pagedResult.currentPage, this.pagedResult.pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.productId.name))
      .subscribe(data => {
        this.rerender(data);
      });
      // this.getMetaData();
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  productClick(product) {
    if (product.type == 'Department') {
      this.listReceiptShipment.forEach(element => {
        if (element.description == product.description) {
          // department
          element.collapse = !element.collapse;
        }
        if (product.description == element.department) {
          // productGroup
          if (element.type == 'ProductGroup') {
            element.show = !element.show;
            if (!product.collapse) {
              element.collapse = true;
            }
          }
          if (element.type == 'Product' && product.collapse) {
            element.show = false;
          }
        }
      });
    } else if (product.type == 'ProductGroup') {
      this.listReceiptShipment.forEach(element => {
        if (element.description == product.description) {
          if (element.collapse) {
            element.collapse = false;
          } else {
            element.collapse = true;
          }
        }
        if (product.description == element.groupName) {
          element.show = !element.show;
        }
      });
    }
  }

  searchProducts(search) {
    console.log(search);
    this.masterDataService.searchProductPQ(search)
    .subscribe(data => this.listProduct = data);
  }

}
