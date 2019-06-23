import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DashboardService } from './dashboard.service'

@Injectable({
  providedIn: 'root'
})
export class DashboardRoleGuard implements CanActivate {

  constructor(private _dashService: DashboardService,
              private _router: Router) 
  { }

  async canActivate() {
    return this._dashService.isAdmin().toPromise().then(
      res => {
        var staffObj = res.staffObj
        var isAdmin = staffObj.isAdmin
        if (isAdmin){
          return true;
        }
        else {
          alert("Only admins allowed on this page.")
          this._router.navigate(['/dashboard'])
          return false;
        }
      }
    ).catch(err => {
      this._router.navigate(['/dashboard/logging'])
      return false;
    })
  }
}
