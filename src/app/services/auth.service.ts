import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private __apiUrl = "http://localhost:3000"
  private _customerSignUpUrl = `${this.__apiUrl}/api/customer/signup`
  private _customerLogInUrl = `${this.__apiUrl}/api/customer/login`
  private _verifyToken = `${this.__apiUrl}/api/customer/verify-token`
  private _orderUrl = `${this.__apiUrl}/api/customer/order`
  private _getOrderByIdUrl = `${this.__apiUrl}/api/order/getById`

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

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

  emitLogin() {
    this.http.post<any>(this._verifyToken, {token: this.getToken()})
    .subscribe(
      res => {
        var customerObj = res.customerObj
        return this.fireIsLoggedIn.emit({
          isLoggedIn: true,
          email: customerObj.email
        })
      },
      err => {
        return this.fireIsLoggedIn.emit({
          isLoggedIn: false,
          email: ""
        })
      }
    )
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  logOut() {
    localStorage.removeItem('token');
  }

  takeOrder(order: any) {
    return this.http.post<any>(this._orderUrl, order);
  }

  getOrderById(order: any) {
    return this.http.post<any>(this._getOrderByIdUrl, order);
  }
}
