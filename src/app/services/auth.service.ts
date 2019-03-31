import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private __apiUrl = "http://localhost:3000"
  private _customerSignUpUrl = `${this.__apiUrl}/api/customer/signup`

  constructor(private http: HttpClient) { }

  signUp(customer: any) {
    return this.http.post<any>(this._customerSignUpUrl, customer);
  }
}
