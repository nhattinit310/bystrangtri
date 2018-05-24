import { QuantityCustomerItemResponse } from './quantity-customer-item-response';

export class QuantityCustomerResponse {
    customerName: string;
    totalQuantity: number;
    supplierItems: QuantityCustomerItemResponse[];
    locationName: string;
}
