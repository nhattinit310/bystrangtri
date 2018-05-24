import { Component, OnInit, Input } from '@angular/core';
import { BankAccount } from '../../../shared/models/report/';
import { ReportService } from '../../services/report.service';
import * as moment from 'moment';
import { PagedResult } from '../../models/paged-result';
import { Subject } from 'rxjs/Subject';
import { BankAccountResponse } from '../../models/api-response/bank-account-response';
import { Subscription } from 'rxjs/Subscription';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'bank-account-table',
  templateUrl: './bank-account-table.component.html',
  styleUrls: ['./bank-account-table.component.scss']
})
export class BankAccountTableComponent implements OnInit {

  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() bankId: number;
  @Input() src: string; // get data Kiên Lương or Phú Quốc
  formatDate = 'DD/MM/YYYY';
  pagedResult: PagedResult<BankAccountResponse>;
  dtTrigger: Subject<any> = new Subject();
  busy: Subscription;

  @Input() dtOptions;
  @Input() bankAccounts: BankAccount[];
  metaData: any; // số dư đầu kỳ, cuối kỳ
  constructor(
    private reportService: ReportService
  ) { }

  ngOnInit() {
    // lấy dữ liệu trong tháng hiện tại
    // let fromDate = moment(`01/${moment().months() + 1}/${moment().year()}`, this.formatDate).unix();
    // let toDate = moment(`${moment().daysInMonth()}/${moment().months() + 1}/${moment().year()}`, this.formatDate).unix();
    // this.reportService.getBankAccPQ(this.src, 0, 10, fromDate, toDate, this.bankId)
    //   .subscribe(data => {
    //     this.rerender(data);
    //   });
  }

  getReport() {
    const pageSize = this.pagedResult && this.pagedResult.pageSize ? this.pagedResult.pageSize : 10;
    this.busy = this.reportService.getBankAccPQ(this.src, 0, pageSize,
      moment(this.fromDate).unix(), moment(this.toDate).unix(), this.bankId)
      .subscribe(data => {
        this.rerender(data);
      });

    // this.getMetaData();
  }

  getMetaData() {
    this.reportService.getBankAccPQMetaData(this.src, moment(this.fromDate).unix(), moment(this.toDate).unix(), this.bankId)
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
    this.busy = this.reportService.getBankAccPQ(this.src, this.pagedResult.currentPage, this.pagedResult.pageSize,
      moment(this.fromDate).unix(), moment(this.toDate).unix(), this.bankId)
      .subscribe(data => {
        this.rerender(data);
      });
  }

}
