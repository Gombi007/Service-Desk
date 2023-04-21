import { Address } from "./address.model";
import { Ticket } from "./ticket.model";

export interface Owner {
    id: string;
    fullname: string;
    email: string;
    phone: number;
    address: Address;
    ticketIds: string[];
}