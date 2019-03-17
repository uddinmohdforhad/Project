import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private __apiUrl = "http://localhost:3000"    
  private _staffLoginUrl = `${this.__apiUrl}/api/staff/login`
  private _staffListUrl = `${this.__apiUrl}/api/staff/getAll`

  constructor(private http: HttpClient) { }

  loginStaff(staff: any) {
    return this.http.post<any>(this._staffLoginUrl, staff)
  }

  getStaffList() {
    return this.http.get<any>(this._staffListUrl)
  }

}
