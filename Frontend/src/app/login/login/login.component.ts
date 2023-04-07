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
  lang: { [key: string]: string } = LANG_EN;
  loginForm!: FormGroup;
  registrationForm!: FormGroup;
  isPending: boolean = false;

  constructor(private languageService: LanguageService, private authService: AuthenticateService, private router: Router, private route: ActivatedRoute) {
    sessionStorage.clear();
  }

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
    if (this.loginForm.valid) {
      this.isPending = true;
      this.authService.loginViaBackend(this.loginForm.value).subscribe({
        next: (data: { token: string, userId: string }) => {
          sessionStorage.setItem('userId', data.userId);
          sessionStorage.setItem('token', data.token);

          let loggedUsernames: string = localStorage.getItem('usernames') ?? '';
          if (!loggedUsernames.includes(this.loginForm.get('username')?.value)) {
            loggedUsernames += this.loginForm.get('username')?.value ?? '';
            loggedUsernames += ';';
            localStorage.setItem('usernames', loggedUsernames)
          }

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

  setPlaceholderUsersFromLocalstorage() {
    let loggedUsernames: string = localStorage.getItem('usernames') ?? '';
    let nameList: string[] = [];
    if (loggedUsernames.length > 0) {
      nameList = loggedUsernames.split(';');
    }
    return nameList;
  }

  startRegister() {
    console.log(this.registrationForm);
  }

}
