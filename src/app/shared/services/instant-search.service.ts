import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from './api-client.service';

@Injectable()
export class InstantSearchService {

  constructor(
    private apiService: ApiClientService,
  ) { }

  search(baseUrl: string, terms: Observable<string>) {
    return terms.debounceTime(600)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(baseUrl + term));
  }

  searchWithFilter(baseUrl: string, terms: Observable<string>, urlFilterParams: URLSearchParams) {
    return terms.debounceTime(600)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(baseUrl + term, urlFilterParams));
  }

  searchEntries(url: string, urlFilterParams: URLSearchParams = new URLSearchParams()) {
    return this.apiService
      .get(url, urlFilterParams)
      .map(response => response.result);
  }

}
