import { Component } from '@angular/core';
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
  tickets: Ticket[] = [
    { id: 'ABC123', owner: 'Nagy Lajos', type: 'Laptop', issue: 'Törött kijelző', assigned: 'TestWorker1', state: this.langState['Waiting_A_Part'] },
    { id: 'CCC223', owner: 'Nagy Árpi', type: 'PC', issue: 'Hibás tápegység', assigned: 'TestWorker2', state: this.langState['In_Progress'] },
  ]
  constructor(private languageService: LanguageService) { }

  showWorkDetails(data: string) {
    this.testOut = data;
  }

}
