export class AccountRequest {
    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    isActive: boolean;
    locationId: number;
    customerId: number;
    permissions: string[]
}