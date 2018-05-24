import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/';
import { ApiClientService } from './api-client.service';
import { LocationRequest } from '../models/api-request/location-request';
import { ApiConvertHelper } from '../helpers/api-convert.helper';
import { UserGroup } from '../models/userGroup/user-group';
import { PagedResult } from '../models/paged-result';
import { InstantSearchService } from './instant-search.service';
import { Notice } from '../models/notice/notice';

@Injectable()
export class LocationService {

  constructor(private apiService: ApiClientService,
    private apiConvert: ApiConvertHelper,
    private instantSearchService: InstantSearchService) { }

  // get danh sách nhóm khách hàng
  getListLocation(terms: Observable<string>, page: number, pageSize: number): Observable<PagedResult<UserGroup>> {
    const url = `location/list/${page}/${pageSize}`;
    // return this.instantSearchService.search(url, terms)
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []).map(this.toLocationListItem),
          extraData: result.extraData && result.extraData[0]
        };
      });
  }

  // tạo mới/update location
  createOrUpdateLocation(model: UserGroup): Observable<any> {
    const data = this.apiConvert.LocationRequestConvert(model);
    const url = model.id ? `location/edit` : `location/create`;
    return this.apiService.post(url, data)
      // tslint:disable-next-line:no-shadowed-variable
      .map(data => data.result);
  }

  // get chi tiết location
  getLocation(id: string): Observable<UserGroup> {
    const url = `location/${id}`;
    return this.apiService.get(url)
      .map(data => this.apiConvert.UserGroupConvert(data.result));
  }

  // active/deactive location
  activeOrDeactiveLocation(id: number, active: boolean): Observable<any> {
    const url = active ? `location/deactive` : `location/active`;
    return this.apiService.post(url, {
      'id': id
    }).map(data => data.result);
  }

  // xóa location
  deleteLocation(id: number): Observable<any> {
    const url = `location/delete`;
    return this.apiService.post(url, {
      'id': id
    }).map(data => data.result);
  }

  // xóa multi location
  deleteMultiLocation(id: any): Observable<any> {
    const url = `location/delete-multi`;
    return this.apiService.post(url, {
      'ids': id
    }).map(data => data.result);
  }

  // get danh sách thông báo theo nhóm người dùng
  // nếu không có nhóm thì get tất cả thông báo
  getNoticeListByLocation(id: number, page: number, pageSize: number): Observable<PagedResult<Notice>> {
    const url = id === 0 ? `notice/list/${page}/${pageSize}` : `location/${id}/notice/${page}/${pageSize}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []).map(this.apiConvert.NoticeConvert),
          extraData: result.extraData && result.extraData[0]
        };
      });
  }

  // tạo thông báo
  createNotice(data: Notice): Observable<any> {
    const url = `notice/create`;
    const obj = this.apiConvert.NoticeRequestConvert(data);
    return this.apiService.post(url, obj)
      // tslint:disable-next-line:no-shadowed-variable
      .map(data => data);
  }

  toLocationListItem(model: any) {
    return {
      id: model.id,
      name: model.locationName,
      isActive: model.isActive,
      check: false
    };
  }

  toNoticeListItem(model: any) {
    console.log(model);
    return {
      title: model.title,
      content: model.content,
      created: ''
    };
  }
}
