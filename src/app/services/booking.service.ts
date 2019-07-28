import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private __apiUrl = "http://localhost:3000"
  private _bookingUrl = `${this.__apiUrl}/api/customer/bookingV2`
  private _getBookingsUrl = `${this.__apiUrl}/api/customer/getBookingsV2`
  private _getBookingUrl = `${this.__apiUrl}/api/customer/getBookingV2`
  private _CancelBookingUrl = `${this.__apiUrl}/api/booking/cancel`
  private _updateBookingUrl = `${this.__apiUrl}/api/booking/update`

  constructor(private http: HttpClient,
              private auth: AuthService) { }
  

  book(booking: any) {
    return this.http.post<any>(this._bookingUrl, booking);
  }

  getMyBookings(){
    var body;
    body = {token: this.auth.getToken()}
    return this.http.post<any>(this._getBookingsUrl, body)
  }

  getBookingById(booking: any){
    return this.http.post<any>(this._getBookingUrl, booking);
  }

  CancelBooking(booking: any){
    return this.http.post<any>(this._CancelBookingUrl, booking);
  }

  updateBooking(booking: any){
    return this.http.post<any>(this._updateBookingUrl, booking);
  }
}
