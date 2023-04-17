import { State } from "./state.enum";

export interface Ticket {
    id: string;
    owner: string
    type: string
    issue: string
    assigned: string
    state: string;
}