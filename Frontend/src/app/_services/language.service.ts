import { Injectable } from '@angular/core';
import { LANG_EN, LANG_HU } from './language.enum';
import { LANG_EN_STATE, LANG_HU_STATE } from '../_models/state.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private lang: { [key: string]: string } = LANG_EN;
  private stateLang: { [key: string]: string } = LANG_EN_STATE;
  private currentLanguage: string = 'en';

  setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.lang = this.currentLanguage === 'en' ? LANG_EN : LANG_HU;
    this.stateLang = this.currentLanguage === 'en' ? LANG_EN_STATE : LANG_HU_STATE;
  }

  get getLanguage(): { [key: string]: string } {
    return this.lang;
  }

  get getStateLanguage(): { [key: string]: string } {
    return this.stateLang;
  }
}
