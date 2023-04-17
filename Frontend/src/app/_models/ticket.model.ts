import { Owner } from "./owner.model";

export interface Ticket {
    id: string;
    owner: Owner;
    type: string;
    issue: string;
    assigned: string;
    state: string;
    netCost: number;
}