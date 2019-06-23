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

  canActivate(): boolean {
    var isLoggedIn = this._dashService.loggedIn();
    
    if(!isLoggedIn) {
      this._router.navigate(['/dashboard/logging'])
      return false;
    } 

    var isAdmin = this._dashService.isAdmin();
    if (isAdmin){
      return true;
    }
    else {
      alert("Only admins allowed on this page.")
      this._router.navigate(['/dashboard'])
      return false;
    }
  }
}
