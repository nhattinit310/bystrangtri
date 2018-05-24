import { Component, OnInit, TemplateRef, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { DATATABLE_CONFIG } from '../../../shared/configs/';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { UserService } from '../../../shared/services/user.service';
import { Subject, BehaviorSubject, Subscription } from 'rxjs/';
import { LocationService } from '../../../shared/services/location.service';
import { PagedResult } from '../../../shared/models/paged-result';
import { UserGroup } from '../../../shared/models/userGroup/user-group';
import { AlertService } from '../../../shared/services/alert.service';
import * as moment from 'moment';

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.scss']
})
export class GroupManagerComponent implements OnInit {

  modalRef: BsModalRef;
  dtTrigger: Subject<any> = new Subject();
  dtOptions: any = {};
  private searchTerm$ = new BehaviorSubject<string>('');
  busy: Subscription;
  currentId: number;
  pagedResult: PagedResult<UserGroup> = new PagedResult<UserGroup>();
  @ViewChild('checkAll1') checkBoxAll: ElementRef;
  constructor(private modalService: BsModalService,
    private locationService: LocationService,
    private alertService: AlertService) { }

  ngOnInit() {
    moment.locale('vi');
    this.dtOptions = DATATABLE_CONFIG;
    this.busy = this.locationService.getListLocation(this.searchTerm$, 0, 10)
      .subscribe(data => {
        this.rerender(data);
      });
  }

  openModal(template: TemplateRef<any>, id?: number) {
    this.modalRef = this.modalService.show(template);
    if (id) {
      this.currentId = id;
    }
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
    this.busy = this.locationService.getListLocation(this.searchTerm$, this.pagedResult.currentPage, this.pagedResult.pageSize)
      .subscribe(data => {
        this.rerender(data);
      });
  }

  activeOrDeactive(user: UserGroup) {
    this.locationService.activeOrDeactiveLocation(user.id, user.isActive)
      .subscribe(data => {
        this.alertService.success('Cập nhật trạng thái nhóm khách hàng thành công');
        this.refresh();
      });
  }

  deleteLocation() {
    this.locationService.deleteLocation(this.currentId)
      .subscribe(data => {
        this.modalRef.hide();
        this.alertService.success('Xóa nhóm khách hàng thành công');
        this.refresh();
      }, err => {
        console.log(err);
        this.alertService.error(err.error.errorMessage);
      });
  }

  deleteMultiLocation() {
    const ids = [];
    this.pagedResult.items.forEach(e => {
      if (e.check) {
        ids.push(e.id);
      }
    });
    this.locationService.deleteMultiLocation(ids)
      .subscribe(data => {
        this.modalRef.hide();
        this.alertService.success('Xóa nhóm khách hàng thành công');
        this.refresh();
      }, err => {
        console.log(err);
        this.alertService.error(err.error.errorMessage);
      });
  }

  checkAll(value) {
    this.pagedResult.items.forEach(e => {
      e.check = value;
    });
  }

  deleteMultiGroupShow(template1: TemplateRef<any>, template2: TemplateRef<any>) {
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
