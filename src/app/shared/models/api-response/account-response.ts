import { Location } from "../accounts/location";
import { Customer } from "../accounts/customer";

export class AccountResponse {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
    location: Location;
    customer: Customer;
    permissions: string[]
}
