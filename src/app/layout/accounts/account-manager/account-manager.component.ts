import { Component, OnInit, AfterViewInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Account } from '../../../shared/models/accounts/account';
import { Subject, BehaviorSubject, Subscription } from 'rxjs/';
import { DATATABLE_CONFIG } from '../../../shared/configs/';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Status } from '../../../shared/common/status.enum';
import { UserService } from '../../../shared/services/user.service';
import { ApiConvertHelper } from '../../../shared/helpers/api-convert.helper';
import { DataTableDirective } from 'angular-datatables/';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PagedResult } from '../../../shared/models/paged-result';
import { AlertService } from '../../../shared/services/alert.service';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})


export class AccountManagerComponent implements OnInit {
  dtTrigger: Subject<any> = new Subject();
  modalRef: BsModalRef;
  dtOptions: DataTables.Settings = DATATABLE_CONFIG;
  searchTerm$ = new BehaviorSubject<string>('');
  pagedResult: PagedResult<Account> = new PagedResult<Account>();
  currentAccId: number;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  @ViewChild('checkAll1') checkBoxAll: ElementRef;
  busy: Subscription;
  constructor(private modalService: BsModalService,
    private userService: UserService,
    private apiConvert: ApiConvertHelper,
    private alertService: AlertService,
    private http: HttpClient) { }


  ngOnInit() {
    this.busy = this.userService.getListAccounts(this.searchTerm$, 0, 10).subscribe(resp => {
      this.rerender(resp);
    });
  }

  rerender(pagedResult: any) {
    this.pagedResult = pagedResult;
    setTimeout(() => {
      this.checkBoxAll.nativeElement.checked = false;
      this.dtTrigger.next();
    });
  }

  pagedResultChange(pagedResult: any) {
    this.refresh();
  }

  refresh(displayAlert: boolean = false): void {
    this.busy = this.userService.getListAccounts(this.searchTerm$, this.pagedResult.currentPage, this.pagedResult.pageSize)
      .subscribe(data => {
        this.rerender(data);
      });
  }

  checkAll(value) {
    this.pagedResult.items.forEach(e => {
      e.check = value;
    });
  }

  activeOrDeactive(acc: Account) {
    this.userService.activeOrDeactive(acc.id, acc.status)
      .subscribe(data => {
        this.alertService.success('Cập nhật trạng thái tài khoản thành công');
        this.refresh();
      });
  }

  clickDeleteAcc() {
    this.userService.deleteAcc(this.currentAccId)
      .subscribe(data => {
        this.alertService.success('Xóa tài khoản thành công');
        this.modalRef.hide();
        this.refresh();
      }, err => {
        console.log(err);
        this.alertService.error(err.error.errorMessage);
        this.modalRef.hide();
      });
  }

  clickDeleteMultiAcc() {
    const ids = [];
    this.pagedResult.items.forEach(e => {
      if (e.check) {
        ids.push(e.id);
      }
    });
    console.log(ids);
    this.userService.deleteMultiAcc(ids)
      .subscribe(data => {
        this.alertService.success('Xóa tài khoản thành công');
        this.modalRef.hide();
        this.refresh();
      }, err => {
        console.log(err);
        this.alertService.error(err.error.errorMessage);
        this.modalRef.hide();
      });
  }

  openModal(template: TemplateRef<any>, id?: number) {
    this.modalRef = this.modalService.show(template);
    if (id) {
      this.currentAccId = id;
    }
  }

  deleteMultiAccShow(template1: TemplateRef<any>, template2: TemplateRef<any>) {
    let noData = true;
    // template1 = delete multi acc modal
    // template2 = confirm delete no data
    this.pagedResult.items.forEach(e => {
      if (e.check) {
        noData = false;
      }
    });
    if (noData) {
      this.modalRef = this.modalService.show(template2);
    } else {
      this.modalRef = this.modalService.show(template1);
    }
  }

}
