import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { InstantSearchService } from './instant-search.service';
import { ApiConvertHelper } from '../helpers/api-convert.helper';
import { Observable } from 'rxjs/Observable';
import { PagedResult } from '../models/paged-result';
import { CommentResponse } from '../models/api-response/comment-response';

@Injectable()
export class CommentService {

  constructor(
    private apiService: ApiClientService,
    private instantSearchService: InstantSearchService,
    private apiConvert: ApiConvertHelper
  ) { }

  getListComment(page: number, pageSize: number): Observable<PagedResult<CommentResponse>> {
    const url = `post/list/${page}/${pageSize}`;
    return this.apiService.get(url)
    .map(data => {
      const result = data.result;
      return {
        currentPage: result.pageIndex,
        pageSize: pageSize,
        pageCount: result.totalPages,
        total: result.totalCount,
        items: (result.items || []).map(this.apiConvert.CommentResponseConvert),
        extraData: result.extraData && result.extraData[0]
      };
    });
  }

  createComment(content: string, authorUserId: number): Observable<any> {
    const url = `post/create`;
    return this.apiService.post(url, {
      content: content,
      authorUserId: authorUserId
    }).map(data => data);
  }

}
