import { Component, EventEmitter, Output } from '@angular/core';
import { LANG_EN, LANG_HU } from '../../language.enum';
import { LanguageService } from 'src/app/services/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output()
  notification$ = new EventEmitter<{ text: string, isError: boolean }>();
  showLoginForm: boolean = true;
  lang: { [key: string]: string } = LANG_EN;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;

  constructor(private languageService: LanguageService) { }

  ngOnInit() {
    this.updateLanguage();
    this.createLoginForm();
    this.createRegistrationForm();
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

  createLoginForm() {
    return this.loginForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  createRegistrationForm() {
    return this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(5)]),
      'email': new FormControl(null, [Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  startLogin() {
    console.log(this.loginForm);
    this.notification$.emit({ text: 'Hello', isError: false });

  }

  startRegister() {
    console.log(this.registrationForm);
  }

}
