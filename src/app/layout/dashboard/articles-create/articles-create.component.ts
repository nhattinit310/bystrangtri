import { Component, OnInit } from '@angular/core';
import { Article } from '../../../shared/models/articles';
import { Notice } from '../../../shared/models/notice/notice';
import { LocationService } from '../../../shared/services/location.service';
import { AlertService } from '../../../shared/services/alert.service';
import { Router } from '@angular/router/';
import { MasterDataService } from '../../../shared/services/master-data.service';
import { Observable } from 'rxjs/Observable';
import { Dictionary } from '../../../shared/models/dictionary.model';

@Component({
  selector: 'app-articles-create',
  templateUrl: './articles-create.component.html',
  styleUrls: ['./articles-create.component.scss']
})
export class ArticlesCreateComponent implements OnInit {

  constructor(
    private locationService: LocationService,
    private alertService: AlertService,
    private masterDataService: MasterDataService,
    private router: Router
  ) { }
  locationList: Observable<Dictionary[]>;
  notice: Notice;
  isValid: boolean = false;
  isSubmit: boolean = false;
  ngOnInit() {
    this.locationList = this.masterDataService.getListLocation();
    this.notice = {
      title: '',
      content: '',
      locationName: '',
      locationId: 1,
      created: null
    };
  }

  createNotice() {
    this.isSubmit = true;
    if (this.isValid) {
      this.locationService.createNotice(this.notice)
      .subscribe(data => {
        this.router.navigate(['/dashboard']);
        this.alertService.success('Tạo thông báo thành công');
      }, err => {
        this.alertService.error('Tạo thông báo thất bại');
      });
    }
  }

  formChange(form) {
    if (form.valid && this.notice.content.trim() && this.notice.title.trim()) {
      this.isValid = true;
    } else {
      this.isValid = false;
    }
  }

}
