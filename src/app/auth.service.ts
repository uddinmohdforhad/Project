import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _staffLoginUrl = "http://localhost:3000/api/staff/login"

  constructor(private http: HttpClient) { }

  loginStaff(staff: any) {
    return this.http.post<any>(this._staffLoginUrl, staff)
  }
}
