import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.scss']
})
export class ShowTicketsComponent {
  @Output() testOut: string = ''

  showWorkDetails(data: string) {
    this.testOut = data;
  }

}
