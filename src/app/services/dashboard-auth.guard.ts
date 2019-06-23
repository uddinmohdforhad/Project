import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { DashboardService } from './dashboard.service'

@Injectable({
  providedIn: 'root'
})
export class DashboardAuthGuard implements CanActivate {

  constructor(private _dashService: DashboardService,
              private _router: Router) 
  { }

  canActivate(): boolean {
    if(this._dashService.loggedIn()) {
      return true;
    } else {
      this._router.navigate(['/dashboard/logging'])
      return false;
    }
  }
}
