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
  testOut: Ticket | undefined;

  address1: Address = { postcode: '1234', country: 'Hungary', city: 'Budapest', street: 'Fő út 23' };
  address2: Address = { postcode: '1212', country: 'Hungary', city: 'Budapest', street: 'Nagy Ernő út 11' };

  owner1: Owner = { id: 'ATBT12', fullname: 'Nagy Lajos', ticketIds: ['ABC123'], email: 'nagylajos@gmail.com', phone: +36201234567, address: this.address1 }
  owner2: Owner = { id: 'ATBT13', fullname: 'Kovács Péter', ticketIds: ['CCC223'], email: 'kovacspeter@gmail.com', phone: +36201212333, address: this.address2 }

  pictures = [
    'https://www.cnet.com/a/img/resize/468ea42b69875136295b704ea9b0ed459612de62/hub/2022/04/27/b796792b-5b34-4405-83eb-efc66371ee06/samsung-galaxy-book-2-pro-360-01.jpg?auto=webp&fit=crop&height=675&width=1200',
    'https://johnlewis.scene7.com/is/image/JohnLewis/laptop-carousel2-140922',
    'https://www.rollingstone.com/wp-content/uploads/2020/09/Surface-Laptop.jpg'
  ];

  tickets: Ticket[] = [
    { id: 'ABC123', owner: this.owner1, type: 'Laptop', issue: 'Törött kijelző', assigned: 'TestWorker1', netCost: 12000, state: this.langState['Waiting_A_Part'], pictures: this.pictures },
    { id: 'CCC223', owner: this.owner2, type: 'PC', issue: 'Hibás tápegység', assigned: 'TestWorker2', netCost: 20000, state: this.langState['In_Progress'], pictures: this.pictures },
  ]
  constructor(private languageService: LanguageService) { }

  showWorkDetails(ticket: Ticket) {
    this.testOut = ticket;
  }

}
