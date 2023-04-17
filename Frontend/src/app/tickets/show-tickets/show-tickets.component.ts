import { Component } from '@angular/core';
import { Address } from 'src/app/_models/address.model';
import { Owner } from 'src/app/_models/owner.model';
import { Ticket } from 'src/app/_models/ticket.model';
import { LanguageService } from 'src/app/_services/language.service';

@Component({
  selector: 'app-show-tickets',
  templateUrl: './show-tickets.component.html',
  styleUrls: ['./show-tickets.component.scss']
})
export class ShowTicketsComponent {
  lang: { [key: string]: string } = this.languageService.getLanguage;
  langState: { [key: string]: string } = this.languageService.getStateLanguage;
  testOut: string = ''

  address1: Address = { postcode: '1234', country: 'Hungary', city: 'Budapest', street: 'Fő út 23' };
  address2: Address = { postcode: '1212', country: 'Hungary', city: 'Budapest', street: 'Nagy Ernő út 11' };

  owner1: Owner = { id: 'ATBT12', fullname: 'Nagy Lajos', ticketIds: ['ABC123'], email: 'nagylajos@gmail.com', phone: +36201234567, address: this.address1 }
  owner2: Owner = { id: 'ATBT13', fullname: 'Kovács Péter', ticketIds: ['CCC223'], email: 'kovacspeter@gmail.com', phone: +36201212333, address: this.address2 }

  tickets: Ticket[] = [
    { id: 'ABC123', owner: this.owner1, type: 'Laptop', issue: 'Törött kijelző', assigned: 'TestWorker1', netCost: 12000, state: this.langState['Waiting_A_Part'] },
    { id: 'CCC223', owner: this.owner2, type: 'PC', issue: 'Hibás tápegység', assigned: 'TestWorker2', netCost: 20000, state: this.langState['In_Progress'] },
  ]
  constructor(private languageService: LanguageService) { }

  showWorkDetails(data: string) {
    this.testOut = data;
  }

}
