import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private __apiUrl = "http://localhost:3000"
  private _customerSignUpUrl = `${this.__apiUrl}/api/customer/signup`
  private _customerLogInUrl = `${this.__apiUrl}/api/customer/login`

  constructor(private http: HttpClient) { }

  signUp(customer: any) {
    return this.http.post<any>(this._customerSignUpUrl, customer);
  }

  logIn(customer: any) {
    return this.http.post<any>(this._customerLogInUrl, customer);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logOut() {
    localStorage.removeItem('token');
  }
}
