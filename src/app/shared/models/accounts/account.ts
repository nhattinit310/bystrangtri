import { Dictionary } from "../dictionary.model";
import { Permission } from "./permission";

export class Account {
    id: number;
    check: boolean;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
    password: string;
    reTypePass: string;
    number: string;
    group: string;
    groupId: number;
    status: string;
    permission: Permission[];
    client: string;
    isClient: boolean;
}
