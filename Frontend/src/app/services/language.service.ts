import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  currentLanguage: string = 'en';

  setLanguage(lang: string) {
    this.currentLanguage = lang;
  }
}
