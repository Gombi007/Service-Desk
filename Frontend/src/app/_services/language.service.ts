import { Injectable } from '@angular/core';
import { LANG_EN, LANG_HU } from './language.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang: { [key: string]: string } = LANG_EN;
  private currentLanguage: string = 'en';

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.lang = this.currentLanguage === 'en' ? LANG_EN : LANG_HU;
  }

  get getLanguage(): { [key: string]: string } {
    return this.lang;
  }
}
