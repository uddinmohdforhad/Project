import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  private __apiUrl = "http://localhost:3000"
  private _addTables = `${this.__apiUrl}/api/tables/add`
  private _updateTables = `${this.__apiUrl}/api/tables/update`
  private _deleteTables = `${this.__apiUrl}/api/tables/delete`
  private _getAllTables = `${this.__apiUrl}/api/tables/getAll`
  private _getTableByNumber = `${this.__apiUrl}/api/tables/getByNumber`
  private _getAvailableTables = `${this.__apiUrl}/api/tables/getAvailableTables`
  private _updateTablesAvailability = `${this.__apiUrl}/api/tables/updateTablesAvailability`

  constructor(private http: HttpClient) { }
  
  add(table: any) {
    return this.http.post<any>(this._addTables, table);
  }

  update(table: any) {
    return this.http.post<any>(this._updateTables, table);
  }

  delete(table: any) {
    return this.http.post<any>(this._deleteTables, table);
  }

  getAllTables() {
    return this.http.get<any>(this._getAllTables);
  }

  getTableByNumber(table: any) {
    return this.http.post<any>(this._getTableByNumber, table);
  }

  getAvailableTables(dateTime: any){
    return this.http.post<any>(this._getAvailableTables, dateTime);
  }

  updateTablesAvailability(requestBody: any){
    return this.http.post<any>(this._updateTablesAvailability, requestBody);
  }
}
