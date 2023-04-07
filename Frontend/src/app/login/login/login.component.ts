import { Component } from '@angular/core';
import { LANG_EN, LANG_HU } from '../../language.enum';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  showLoginForm: boolean = false;
  lang: { [key: string]: string } = LANG_EN;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.updateLanguage();
  }

  setLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.updateLanguage();
  }

  updateLanguage() {
    this.lang = this.languageService.currentLanguage === 'en' ? LANG_EN : LANG_HU;
  }

  changeForm() {
    this.showLoginForm = !this.showLoginForm;
  }

}
