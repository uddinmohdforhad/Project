import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  private __apiUrl = "http://localhost:3000"    
  private _staffLoginUrl = `${this.__apiUrl}/api/staff/login`
  private _staffListUrl = `${this.__apiUrl}/api/staff/getAll`
  private _staffRegister = `${this.__apiUrl}/api/staff/register`
  private _staffGetById = `${this.__apiUrl}/api/staff/getById`
  private _staffRemoveUrl = `${this.__apiUrl}/api/staff/remove`

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
}
