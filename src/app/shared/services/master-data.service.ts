import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ApiClientService } from './api-client.service';
import { Dictionary } from '../models/dictionary.model';

@Injectable()
export class MasterDataService {

  constructor(
    private apiService: ApiClientService
  ) { }

  getListLocation(): Observable<Dictionary[]> {
    const url = `data/locations`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.locationName
          };
        });
      });
  }

  getListSupplier(): Observable<Dictionary[]> {
    const url = `data/suppliers`;
    return this.apiService.get(url)
    .map(data => {
      return data.result.map(e => {
        return {
          name: e.id,
          value: e.supplierName
        };
      });
    });
  }

  getListCementSupplier(): Observable<any[]> {
    const url = `data/cementsuppliers`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  getListCustomer(): Observable<Dictionary[]> {
    const url = `data/customers`;
    return this.apiService.get(url)
    .map(data => {
      return data.result.map(e => {
        return {
          name: e.id,
          value: e.customerName
        };
      });
    });
  }

  searchCustomer(query: string): Observable<Dictionary[]> {
    const url = `data/customers/search?text=${query}`;
    return this.apiService.get(url)
    .map(data => {
      return data.result.map(e => {
        return {
          name: e.id,
          value: e.customerName
        };
      });
    });
  }

  searchSupplier(query: string): Observable<Dictionary[]> {
    const url = `data/suppliers/search?text=${query}`;
    return this.apiService.get(url)
    .map(data => {
      return data.result.map(e => {
        return {
          name: e.id,
          value: e.supplierName
        };
      });
    });
  }

  getListCompanyBankKL(): Observable<Dictionary[]> {
    const url = `data/kl/companybanks`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.companyBankName
          };
        });
      });
  }

  getListCompanyBankPQ(): Observable<Dictionary[]> {
    const url = `data/pq/companybanks`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.companyBankName
          };
        });
      });
  }

  getListProductPQ(): Observable<Dictionary[]> {
    const url = `data/pq/products`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.productName
          };
        });
      });
  }

  searchProductPQ(text: string): Observable<Dictionary[]> {
    const url = `data/pq/products/search?text=${text}`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.productName
          };
        });
      });
  }

  getListProductKL(): Observable<Dictionary[]> {
    const url = `data/kl/products`;
    return this.apiService.get(url)
      .map(data => {
        return data.result.map(e => {
          return {
            name: e.id,
            value: e.productName
          };
        });
      });
  }
}
