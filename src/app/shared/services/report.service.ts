import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
import { Observable } from 'rxjs/Observable';
import { BusinessEffResponse } from '../models/api-response/business-eff-response';
import { PagedResult } from '../models/paged-result';
import { QuantitySupplierResponse } from '../models/api-response/quantity-supplier-response';
import { InstantSearchService } from './instant-search.service';
import { ApiConvertHelper } from '../helpers/api-convert.helper';
import { DeliveryResponse } from '../models/api-response/delivery-response';
import { BankAccountResponse } from '../models/api-response/bank-account-response';
import { DebtSupplierResponse } from '../models/api-response/debt-supplier-response';
import { DebtCustomerResponse } from '../models/api-response/debt-customer-response';
import { ReceiptShipmentResponse } from '../models/api-response/receipt-shipment-response';
import { CashBookResponse } from '../models/api-response/cashbook-response';
import { QuantityCustomerResponse } from '../models/api-response/quantity-customer-response';

@Injectable()
export class ReportService {

  constructor(
    private apiService: ApiClientService,
    private instantSearchService: InstantSearchService,
    private apiConvert: ApiConvertHelper
  ) { }

  // báo cáo hiệu quả kinh doanh
  getBussinessEff(fromDate: number, toDate: number): Observable<BusinessEffResponse> {
    const url = `report/kl/businessefficiency?fromDate=${fromDate}&toDate=${toDate}`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  // báo cáo sản lượng NCC
  getQuantitySupplier(fromDate: number, toDate: number, supplierId: number, page: number,
    pageSize: number, terms: Observable<string>): Observable<PagedResult<QuantitySupplierResponse>> {
    const url = `report/kl/quantitysupplier/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&supplierId=${supplierId}`;
    return this.apiService.get(url)
      // return this.instantSearchService.search(url, terms)
      .map(data => {
        const result = data.result;
        console.log(result);
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData && result.extraData[0]
        };
      });
  }

  // báo cáo danh sách hàng giao
  getListDelivery(page: number, pageSize: number, fromDate: number, toDate: number,
    productId: number): Observable<PagedResult<DeliveryResponse>> {
    const url = productId == 0 ? `report/pq/deliverylist/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}`
      : `report/pq/deliverylist/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&productId=${productId}`;
    // return this.instantSearchService.search(url, terms)
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData && result.extraData[0]
        };
      });
  }

  // báo cáo tài khoản ngân hàng phú quốc/ kiên lương
  getBankAccPQ(src: string, page: number, pageSize: number, fromDate: number,
    toDate: number, companyBankId: number): Observable<PagedResult<BankAccountResponse>> {
    const url = companyBankId == 0 ? `report/${src}/bankaccount/detail/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}` :
      `report/${src}/bankaccount/detail/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&companyBankId=${companyBankId}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData
        };
      });
  }

  // số dư đầu kỳ, cuối kỳ báo cáo tài khoản ngân hàng phú quốc/ kiên lương
  getBankAccPQMetaData(src: string, fromDate: number, toDate: number, companyBankId: number): Observable<any> {
    const url = companyBankId == 0 ? `report/${src}/bankaccount?fromDate=${fromDate}&toDate=${toDate}` :
      `report/${src}/bankaccount?fromDate=${fromDate}&toDate=${toDate}&companyBankId=${companyBankId}`;

    return this.apiService.get(url)
      .map(data => data.result);
  }

  // báo cáo công nợ bán hàng
  getReportDebtCustomer(page: number, pageSize: number, fromDate: number, toDate: number,
    customerId: number): Observable<PagedResult<DebtCustomerResponse>> {
    const url = `report/kl/debt/customer/detail/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&customerId=${customerId}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData[0]
        };
      });
  }

  // báo cáo công nợ bán hàng meta data
  getReportDebtCustomerMetaData(fromDate: number, toDate: number, customerId: number): Observable<any> {
    const url = `report/kl/debt/customer?fromDate=${fromDate}&toDate=${toDate}&customerId=${customerId}`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  // báo cáo công nợ mua hàng
  getReportDebtSupplier(page: number, pageSize: number, fromDate: number, toDate: number,
    supplierId: number): Observable<PagedResult<DebtSupplierResponse>> {
    const url = supplierId == 0 ? `report/kl/debt/supplier/detail/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}`
      : `report/kl/debt/supplier/detail/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&supplierId=${supplierId}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData
        };
      });
  }

  // báo cáo công nợ mua hàng meta data
  getReportDebtSupplierMetaData(fromDate: number, toDate: number, supplierId: number): Observable<any> {
    const url = supplierId == 0 ? `report/kl/debt/supplier?fromDate=${fromDate}&toDate=${toDate}`
      : `report/kl/debt/supplier?fromDate=${fromDate}&toDate=${toDate}&supplierId=${supplierId}`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  // báo cáo sổ quỹ tiền mặt
  getCashBook(page: number, pageSize: number, fromDate: number, toDate: number): Observable<PagedResult<CashBookResponse>> {
    const url = `report/pq/cashbook/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData
        };
      });
  }

  // báo cáo xuất nhập tồn
  getReceiptShipment(page: number, pageSize: number, fromDate: number, toDate: number,
    productId: number): Observable<PagedResult<ReceiptShipmentResponse>> {
    const url = productId == 0 ? `report/pq/receiptshipmentinventory/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}`
      : `report/pq/receiptshipmentinventory/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&productId=${productId}`;
    return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData
        };
      });
  }

  // báo cáo xuất nhập tồn meta data
  getReceiptShipmentMetaData(fromDate: number, toDate: number, productId: number): Observable<any> {
    const url = productId == 0 ? `report/pq/receiptshipmentinventory?fromDate=${fromDate}&toDate=${toDate}`
    : `report/pq/receiptshipmentinventory?fromDate=${fromDate}&toDate=${toDate}&productId=${productId}`;
    return this.apiService.get(url)
      .map(data => data.result);
  }

  // báo cáo theo dõi sản lượng khách hàng
  getQuantityCustomer(page: number, pageSize: number, fromDate: number, toDate: number,
    customerId: number): Observable<PagedResult<QuantityCustomerResponse>> {
    const url = customerId == 0 ? `report/kl/quantitycustomer/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}` :
      `report/kl/quantitycustomer/${page}/${pageSize}?fromDate=${fromDate}&toDate=${toDate}&customerId=${customerId}`;
      return this.apiService.get(url)
      .map(data => {
        const result = data.result;
        return {
          currentPage: result.pageIndex,
          pageSize: pageSize,
          pageCount: result.totalPages,
          total: result.totalCount,
          items: (result.items || []),
          extraData: result.extraData
        };
      });
  }
}
