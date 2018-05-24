import { Component, OnInit, ViewChild } from '@angular/core';
import { Debt } from '../../../shared/models/sales/debt';
import { Subject } from 'rxjs/Subject';
import { DataTableDirective } from 'angular-datatables';
import { DataTablesModule } from 'angular-datatables/src/angular-datatables.module';
import { DATATABLE_CONFIG, DATEPICKER_CONFIG } from '../../../shared/configs/';
import { ReportService } from '../../../shared/services/report.service';
import * as moment from 'moment';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Dictionary } from '../../../shared/models/dictionary.model';
import { Observable, Subscription } from 'rxjs/';
import { DebtCustomerResponse } from '../../../shared/models/api-response/debt-customer-response';
import { PagedResult } from '../../../shared/models/paged-result';
import { JwtService } from '../../../shared/services/jwt.service';
import { DebtCustomer } from '../../../shared/models/debt/debt-customer';
import { viLocale } from '../../../shared/locale/vi';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { BsLocaleService } from 'ngx-bootstrap/datepicker/';

@Component({
  selector: 'app-report-debt',
  templateUrl: './report-debt.component.html',
  styleUrls: ['./report-debt.component.scss']
})
export class ReportDebtComponent implements OnInit {

  dtOptions = DATATABLE_CONFIG;
  bsConfig = DATEPICKER_CONFIG;
  debts: Debt[] = [

  ];
  descArr = [
    'Xi măng Vicem Hà Tiên Đa Dụng',
    'Xi măng Vicem Hà Tiên PCB40',
    'Xi măng Insee'
  ];
  noteArr = [
    'Sacombank D.B.Nhàn',
    'Agribank P.D.Phùng',
    'BIDV N.C.Thanh'
  ];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtTrigger: Subject<any> = new Subject();
  totalTotalPrice = 0;
  totalAmountPayment = 0;
  totalDebt = 0;
  fromDate: any;
  toDate: any;
  customerId: Dictionary = {
    name: '0',
    value: ''
  };
  listCustomer: Dictionary[];
  pagedResult: PagedResult<DebtCustomerResponse>;
  listDebtCustomer: DebtCustomer[];
  busy: Subscription;
  currentCustomerId: string;
  metaData: any; // dư nợ đầu ngày, cuối ngày
  isSubmit = false;

  constructor(
    private reportService: ReportService,
    private masterDataService: MasterDataService,
    private jwtService: JwtService,
    private _localeService: BsLocaleService
  ) { }

  ngOnInit() {
    defineLocale('vi', viLocale);
    this._localeService.use('vi');
    window.scrollTo(0, 0);
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
  }

  getReport() {
    this.isSubmit = true;
    if (!this.fromDate || !this.toDate || (this.fromDate > this.toDate)) {
      return;
    }
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getReportDebtCustomer(0, pageSize, moment(this.fromDate).unix(),
      moment(this.toDate).unix(), this.currentCustomerId ? Number.parseInt(this.currentCustomerId) : Number.parseInt(this.customerId.name))
      .subscribe(data => {
        console.log(data);
        this.pagedResult = data;
        this.rerender(data);
      });
    // this.getMetaData();
  }

  onBlur(data) {
    if (!data) {
      this.customerId = {
        name: '0',
        value: ''
      };
    }
  }

  getMetaData() {
    this.reportService.getReportDebtCustomerMetaData(moment(this.fromDate).unix(),
      moment(this.toDate).unix(), Number.parseInt(this.customerId.name))
      .subscribe(data => {
        console.log(data);
        this.metaData = data;
      });
  }

  rerender(pagedResult: any) {
    this.pagedResult = pagedResult;
    // phân trang theo group, 1 item phân trang có thể có nhiều hơn 1 dòng
    this.listDebtCustomer = [];
    this.pagedResult.items.forEach(element => {
      element.items.forEach(item => {
        const debt = new DebtCustomer();
        debt.amount = item.amount;
        debt.description = item.description;
        debt.documentDate = element.documentDate * 1000;
        // debt.documentNo =
        debt.accumulatedDebtAmount = item.accumulatedDebtAmount;
        debt.paymentAmount = item.paymentAmount;
        debt.quantity = item.quantity;
        debt.unitPrice = item.unitPrice;
        debt.vehicleNoPlate = element.vehicleNoPlate;
        this.listDebtCustomer.push(debt);
      });
    });
    setTimeout(() => {
      this.dtTrigger.next();
    });
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.reportService.getReportDebtCustomer(this.pagedResult.currentPage,
      this.pagedResult.pageSize, moment(this.fromDate).unix(), moment(this.toDate).unix(),
      this.currentCustomerId ? Number.parseInt(this.currentCustomerId) : Number.parseInt(this.customerId.name))
      .subscribe(data => {
        this.rerender(data);
      });
    // this.getMetaData();
  }

  searchCustomers(search) {
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
  return Math.floor(Math.random() * (max - 1 + min) + 1);
}
