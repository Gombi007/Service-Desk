import { Component, Input } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket.model';

@Component({
  selector: 'app-detail-ticket',
  templateUrl: './detail-ticket.component.html',
  styleUrls: ['./detail-ticket.component.scss']
})
export class DetailTicketComponent {
  @Input() _ticket: Ticket | undefined;
}