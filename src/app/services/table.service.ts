import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private __apiUrl = "http://localhost:3000"
  private _getAvailableTables = `${this.__apiUrl}/api/tables/getAvailableTables`
  private _updateTablesAvailability = `${this.__apiUrl}/api/tables/updateTablesAvailability`

  constructor(private http: HttpClient) { }
  
  getAvailableTables(dateTime: any){
    return this.http.post<any>(this._getAvailableTables, dateTime);
  }

  updateTablesAvailability(requestBody: any){
    return this.http.post<any>(this._updateTablesAvailability, requestBody);
  }
}
