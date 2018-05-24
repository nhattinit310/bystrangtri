import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Productivity } from '../../../shared/models/sales/productivity';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { JwtService } from '../../../shared/services/jwt.service';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { ReportService } from '../../../shared/services/report.service';
import * as moment from 'moment';
import { List } from 'linqts';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';
import { viLocale } from '../../../shared/locale/vi';
import { Subject } from 'rxjs/Subject';
import { PagedResult } from '../../../shared/models/paged-result';
import { QuantityCustomerResponse } from '../../../shared/models/api-response/quantity-customer-response';
import { Subscription } from 'rxjs/Subscription';
import { DataTableDirective } from 'angular-datatables/';

@Component({
  selector: 'app-report-productivity',
  templateUrl: './report-productivity.component.html',
  styleUrls: ['./report-productivity.component.scss']
})
export class ReportProductivityComponent implements OnInit, AfterViewInit {

  dtOptions = DATATABLE_CONFIG;

  productivitys: Productivity[] = [

  ];
  bsConfig = DATEPICKER_CONFIG;
  isShowVicem = false;
  isShowInsee = false;
  isShowST = false;
  isShowDH = false;
  isShowTP = false;
  currentCustomerId: string;
  customerId: Dictionary = {
    name: '0',
    value: ''
  };
  listCustomer: Dictionary[];
  fromDate: any;
  toDate: any;
  listCementSupplier: any[];
  listSupplierData: any[];
  loadData = false;
  dtTrigger: Subject<any> = new Subject();
  pagedResult: PagedResult<QuantityCustomerResponse>;
  busy: Subscription;
  isSubmit = false;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  revertOrderArea = {
    currentSort: true,
    desc: false
  };
  revertOrderCustomer = {
    currentSort: false,
    desc: false
  };
  constructor(
    private jwtService: JwtService,
    private masterDataService: MasterDataService,
    private reportService: ReportService,
    private _localeService: BsLocaleService
  ) { }

  ngOnInit() {
    moment.locale('vi');
    console.log(moment.locale());
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    this.currentCustomerId = this.jwtService.getUserObj().client; // nhóm khách hàng id, null = ko phải khách hàng
    this.masterDataService.getListCustomer()
      .subscribe(data => {
        if (this.currentCustomerId) {
          // nếu là khách hàng thì chỉ hiển thị khách hàng đang đăng nhập
          this.listCustomer = data.filter(i => i.name == this.currentCustomerId);
        } else {
          // hiển thị hết các khách hàng
          this.listCustomer = data;
        }
      });
    this.setupData();
    this.masterDataService.getListCementSupplier()
      .subscribe(data => {
        this.listCementSupplier = data;
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
    console.log(this.dtElement);
  }

  setupData() {
    window.scrollTo(0, 0);
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getQuantityCustomer(0, pageSize, moment(this.fromDate).unix(), moment(this.toDate).unix(),
      this.currentCustomerId ? Number.parseInt(this.currentCustomerId) : Number.parseInt(this.customerId.name))
      .subscribe(data => {
        // this.pagedResult = data;
        this.rerender(data);
      });
  }

  onBlur(data) {
    if (!data) {
      this.customerId = {
        name: '0',
        value: ''
      };
    }
  }

  rerender(pagedResult: any) {
    this.pagedResult = pagedResult;
    const listSupplier = [];
    let listSupplierItem = [];
    this.listSupplierData = [];
    this.productivitys = [];
    pagedResult.items.forEach(e => {
      if (e && e.supplierItems) {
        listSupplierItem = listSupplierItem.concat(e.supplierItems);
        e.supplierItems.forEach(i => {
          listSupplier.push(i.supplierId);
        });
      }
    });
    const listSupplierLinQ = new List<Number>(listSupplier);
    const listQuantitySupplierLinQ = new List<any>(listSupplierItem);
    const listQuantitySupplierLinQGroupById = listQuantitySupplierLinQ.GroupBy(i => i.supplierId, m => m);
    // tslint:disable-next-line:forin
    for (const key in listQuantitySupplierLinQGroupById) {
      const listProductId = [];
      for (const key1 in listQuantitySupplierLinQGroupById[key]) {
        // tslint:disable-next-line:forin
        listQuantitySupplierLinQGroupById[key][key1].productItems.forEach(element => {
          listProductId.push(element.productId);
        });
      }
      const listProductIdLinQ = new List<any>(listProductId);
      const listProduct = [];
      const listProductIdLinQDistinct = listProductIdLinQ.Distinct().ToArray();
      // tslint:disable-next-line:forin
      for (const p in listProductIdLinQDistinct) {
        const product = {
          id: listProductIdLinQDistinct[p],
          name: this.listCementSupplier.find(i => i.id == key)
            .products.find(i => i.id == listProductIdLinQDistinct[p]).productName
        };
        listProduct.push(product);
      }
      const supplierData = {
        id: Number.parseInt(key),
        name: this.listCementSupplier.find(i => i.id == key).supplierName1,
        listProductId: listProduct,
        collapse: false
      };
      this.listSupplierData.push(supplierData);
    }
    pagedResult.items.forEach(e => {
      const product = new Productivity();
      product.customer = e && e.customerName;
      product.total = e && e.totalQuantity;
      product.items = [];
      product.area = e && e.locationName;
      this.listSupplierData.forEach(element => {
        if (e && e.supplierItems.find(item => item.supplierId == element.id)) {
          element.listProductId.forEach(p => {
            product.items.push({
              supplierId: element.id,
              items: e.supplierItems.find(item => item.supplierId == element.id)
                .productItems.find(pi => pi.productId == p.id)
            });
          });
        } else {
          element.listProductId.forEach(p => {
            product.items.push({
              supplierId: element.id
            });
          });
        }
      });
      const itemList = new List<any>(product.items);
      product.items = itemList.GroupBy(i => i.supplierId, m => m);
      // tslint:disable-next-line:forin
      for (const key in product.items) {
        let tong = 0;
        product.items[key].forEach(i => {
          if (i.items && i.items.quantity) {
            console.log(tong);
            tong += i.items.quantity;
          }
        });
        product.items[key].total = Math.round(tong * 100) / 100 ;
      }
      this.productivitys.push(product);
    });
    // setTimeout(() => {
    //   // this.dtTrigger.next();
    //   console.log(this.dtElement);
    // });
    console.log(this.productivitys);
    if (this.revertOrderArea.currentSort) {
      this.orderList(this.productivitys, 'area', !this.revertOrderArea.desc);
    }
    if (this.revertOrderCustomer.currentSort) {
      this.orderList(this.productivitys, 'customer', !this.revertOrderCustomer.desc);
    }
  }

  reOrderCustomer() {
    this.orderList(this.productivitys, 'customer', this.revertOrderCustomer.desc);
    this.revertOrderCustomer.currentSort = true;
    this.revertOrderArea.currentSort = false;
    this.revertOrderCustomer.desc = !this.revertOrderCustomer.desc;
  }

  orderList(list, fieldSort, desc) {
    list.sort((a, b): number => {
      // để so sánh tiếng việt, set locale = vi sau đó sử dụng localeCompare
      const cpr = a[fieldSort].substring(0, 1).localeCompare(b[fieldSort].substring(0, 1));
      // const cpr = a[fieldSort].localeCompare(b[fieldSort]);
      if (cpr != 0) {
        return desc ? cpr : (cpr * -1);
      }
      return cpr;
    });
  }

  reOrderArea() {
    this.orderList(this.productivitys, 'area', this.revertOrderArea.desc);
    this.revertOrderCustomer.currentSort = false;
    this.revertOrderArea.currentSort = true;
    this.revertOrderArea.desc = !this.revertOrderArea.desc;
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.reportService.getQuantityCustomer(this.pagedResult.currentPage,
      this.pagedResult.pageSize, moment(this.fromDate).unix(), moment(this.toDate).unix(),
      this.currentCustomerId ? Number.parseInt(this.currentCustomerId) : Number.parseInt(this.customerId.name))
      .subscribe(data => {
        this.rerender(data);
      });
    // this.getMetaData();
  }

  searchCustomers(search) {
    console.log(search);
    this.masterDataService.searchCustomer(search)
      .subscribe(data => {
        if (this.currentCustomerId) {
          // nếu là khách hàng thì chỉ hiển thị khách hàng đang đăng nhập
          this.listCustomer = data.filter(i => i.name == this.currentCustomerId);
        } else {
          // hiển thị hết các khách hàng
          this.listCustomer = data;
        }
      });
  }

}


function randomIntFromInterval(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
