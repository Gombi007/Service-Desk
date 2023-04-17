import { Component, EventEmitter, Output } from '@angular/core';
import { Ticket } from 'src/app/_models/ticket.model';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.scss']
})
export class ShowTicketsComponent {
  testOut: string = ''
  tickets: Ticket[] = [
    { id: 'ABC123', owner: 'Nagy Lajos', type: 'Laptop', issue: 'Törött kijelző', assigned: 'TestWorker1', state: 'Folyamatban' },
    { id: 'CCC223', owner: 'Nagy Árpi', type: 'PC', issue: 'Hibás tápegység', assigned: 'TestWorker2', state: 'Alkatrészre Vár' },
  ]

  showWorkDetails(data: string) {
    this.testOut = data;
  }

}
