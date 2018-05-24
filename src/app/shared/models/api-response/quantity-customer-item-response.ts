import { ProductItem } from '../product-item';

export class QuantityCustomerItemResponse {
    supplierId: number;
    totalQuantity: number;
    productItems: ProductItem[];
}
