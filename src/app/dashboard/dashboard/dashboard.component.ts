import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  staff = {
    isLoggedIn: false,
    email: "",
    isAdmin: false
  }

  constructor(private _dashService: DashboardService,
    private _router: Router) { }

  ngOnInit() {
    this._dashService.emitLogin();
    this._dashService.getEmitter().subscribe(
      (staffObj) => {
        this.staff = staffObj
      })
  }

  logOut(){
    this._dashService.logOut();
    this._dashService.emitLogin();  
    this._router.navigate(['/dashboard/logging']);
  }
}
