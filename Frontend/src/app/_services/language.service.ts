import { Injectable } from '@angular/core';
import { LANG_EN_STATE, LANG_HU_STATE } from '../_enums/state.enum';
import { LANG_EN, LANG_HU } from '../_enums/language.enum';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  //if localstorage not includes 'lang' field the default is English
  private lang: { [key: string]: string } = localStorage.getItem('lang') === 'hu' ? LANG_HU : LANG_EN
  private stateLang: { [key: string]: string } = localStorage.getItem('lang') === 'hu' ? LANG_HU_STATE : LANG_EN_STATE

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
    this.lang = localStorage.getItem('lang') === 'hu' ? LANG_HU : LANG_EN;
    this.stateLang = localStorage.getItem('lang') === 'hu' ? LANG_HU_STATE : LANG_EN_STATE;
  }

  get getLanguage(): { [key: string]: string } {
    return this.lang;
  }

  get getStateLanguage(): { [key: string]: string } {
    return this.stateLang;
  }
}
