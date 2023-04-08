import { Component, EventEmitter, Output } from '@angular/core';
import { LANG_EN, LANG_HU } from 'src/app/_services/language.enum';
import { LanguageService } from 'src/app/_services/language.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/_services/authenticate.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Output()
  notification$ = new EventEmitter<{ text: string, isError: boolean }>();
  showLoginForm: boolean = true;
  lang: { [key: string]: string } = this.languageService.getLanguage;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  isPending: boolean = false;

  constructor(private languageService: LanguageService, private authService: AuthenticateService, private router: Router, private route: ActivatedRoute) {
    sessionStorage.clear();
  }

  ngOnInit() {
    this.createLoginForm();
    this.createRegistrationForm();
  }

  setLanguage(lang: string) {
    this.languageService.setLanguage(lang);
    this.lang = this.languageService.getLanguage;
  }

  changeForm() {
    this.showLoginForm = !this.showLoginForm;
  }

  createLoginForm() {
    return this.loginForm = new FormGroup({
      //min 5 char length and allowed only lowercase letters and digits in any languages, no whitespace, no special chars, no uppercase
      'username': new FormControl(null, [Validators.required, Validators.pattern(/^[\p{Ll}0-9]{5,}$/u)]),
      // min 6 length char and allowed upper and lowercase letters and digits and special chars in any language, no whitespace
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\p{L}\p{M}!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]{6,}$/u)])
    });
  }

  createRegistrationForm() {
    return this.registrationForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.pattern(/^[\p{Ll}0-9]{5,}$/u)]),
      'email': new FormControl(null, [Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\p{L}\p{M}!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]{6,}$/u)]),
      'confirmPassword': new FormControl(null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9\p{L}\p{M}!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?]{6,}$/u)])
    });
  }

  startLogin() {
    if (this.loginForm.valid) {
      this.isPending = true;
      this.authService.loginViaBackend(this.loginForm.value).subscribe({
        next: (data: { token: string, userId: string }) => {
          sessionStorage.setItem('userId', data.userId);
          sessionStorage.setItem('token', data.token);
          this.saveLoggedUsersnameInLocalStorage();
          this.loginForm.reset();
          this.isPending = false;
          this.router.navigate(['show-tickets']);
        },
        error: (err) => {
          this.notification$.emit({ text: this.lang['Error_Notification_Login'], isError: true });
          this.isPending = false;
        },
      });
    }
  }

  saveLoggedUsersnameInLocalStorage() {
    let loggedUsernames: string = localStorage.getItem('usernames') ?? '';
    if (!loggedUsernames.includes(this.loginForm.get('username')?.value)) {
      loggedUsernames += this.loginForm.get('username')?.value ?? '';
      loggedUsernames += ';';
      localStorage.setItem('usernames', loggedUsernames)
    }
  }

  setPlaceholderUsersFromLocalstorage() {
    let loggedUsernames: string = localStorage.getItem('usernames') ?? '';
    let nameList: string[] = [];
    if (loggedUsernames.length > 0) {
      nameList = loggedUsernames.split(';');
    }
    return nameList;
  }

  startRegister() {
    if (this.registrationForm.valid) {

    }
  }

  checkValidField(fieldName: string) {
    return this.registrationForm.controls[fieldName].invalid
      && this.registrationForm.controls[fieldName].dirty
      && this.registrationForm.controls[fieldName].value
  }

  checkSamePassword() {
    return this.registrationForm.controls['password'].value
      === this.registrationForm.controls['confirmPassword'].value
  }
}
