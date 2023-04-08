import { Component } from '@angular/core';
import { LanguageService } from '../_services/language.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  lang: { [key: string]: string } = this.languageService.getLanguage;
  constructor(private languageService: LanguageService) { }

}
