import { Injectable, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private __apiUrl = "http://localhost:3000"    
  private _staffLoginUrl = `${this.__apiUrl}/api/staff/login`
  private _verifyToken = `${this.__apiUrl}/api/staff/verify-token`
  private _staffListUrl = `${this.__apiUrl}/api/staff/getAll`
  private _staffRegister = `${this.__apiUrl}/api/staff/register`
  private _staffGetById = `${this.__apiUrl}/api/staff/getById`
  private _staffRemoveUrl = `${this.__apiUrl}/api/staff/remove`
  private _staffUpdateUrl = `${this.__apiUrl}/api/staff/update`
  private _staffGetAllBookingsUrl = `${this.__apiUrl}/api/staff/getAllBookings`
  private _staffGetBookingsByDateUrl = `${this.__apiUrl}/api/staff/getBookingsByDate`
  private _staffGetBookingByIdUrl = `${this.__apiUrl}/api/staff/getBookingById`
  private _adminGetOrders = `${this.__apiUrl}/api/order/get`

  @Output() fireIsLoggedIn: EventEmitter<any> = new EventEmitter<any>();

  constructor(private http: HttpClient) { }

  addStaff(staff: any) {
    return this.http.post<any>(this._staffRegister, staff);
  }

  loginStaff(staff: any) {
    return this.http.post<any>(this._staffLoginUrl, staff)
  }

  getStaffList() {
    return this.http.get<any>(this._staffListUrl)
  }

  getStaffById(staff: any) {
    return this.http.post<any>(this._staffGetById, staff)
  }

  removeStaff(staff: any) {
    return this.http.post<any>(this._staffRemoveUrl, staff)
  }

  updateStaff(staff: any) {
    return this.http.post<any>(this._staffUpdateUrl, staff)
  }

  loggedIn() {
    return !!localStorage.getItem('StaffToken');
  }

  getToken() {
    return localStorage.getItem('StaffToken');
  }

  logOut() {
    localStorage.removeItem('StaffToken');
  }

  getEmitter() {
    return this.fireIsLoggedIn;
  }

  emitLogin() {
    this.http.post<any>(this._verifyToken, {token: this.getToken()})
    .subscribe(
      res => {
        var staffObj = res.staffObj
        return this.fireIsLoggedIn.emit({
          isLoggedIn: true,
          email: staffObj.email,
          isAdmin: staffObj.isAdmin
        })
      },
      err => {
        return this.fireIsLoggedIn.emit({
          isLoggedIn: false,
          email: "",
          isAdmin: false
        })
      }
    )
  }

  isAdmin() {
    return this.http.post<any>(this._verifyToken, {token: this.getToken()});
  }

  getAllBookings(){
    return this.http.get<any>(this._staffGetAllBookingsUrl);
  }

  getBookingsByDate(req: any) {
    return this.http.post<any>(this._staffGetBookingsByDateUrl, req)
  }

  getBookingById(req: any) {
    return this.http.post<any>(this._staffGetBookingByIdUrl, req)
  }

  getAllOrders(){
    return this.http.get<any>(this._adminGetOrders)
  }
}
