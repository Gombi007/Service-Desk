import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Constans } from './constans.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  isLoggedIn() {
    return sessionStorage.getItem('token') != null;
  }

  loginViaBackend(userCredential: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let body = JSON.stringify(userCredential);
    return this.http.post<{ token: string, userId: string }>(Constans.SERVER_URL + Constans.API_LOGIN, body, { headers });
  }

  registerViaBackend(userData: any) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    let body = JSON.stringify(userData);
    return this.http.post<{ token: string, userId: string }>(Constans.SERVER_URL + Constans.API_REGISTRATION, userData, { headers });
  }
}
