import { DebtCustomerItemResponse } from './debt-customer-item-response';

export class DebtCustomerResponse {
    documentNo: string;
    documentDate: number;
    vehicleNoPlate: string;
    paymentAmount: number;
    items: DebtCustomerItemResponse[];
}
