import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  staff = {
    isLoggedIn: false,
    email: "",
    isAdmin: false
  }
  constructor(private _dashService: DashboardService) { }

  async ngOnInit() {
    this._dashService.emitLogin();
    this._dashService.getEmitter().subscribe(
      (staffObj) => {
        this.staff = staffObj
      })
  }

  isAdmin(): string {
    if(this.staff.isAdmin)
      return "Admin"
    else
      return "Staff"
  }

  logOut(){
    this._dashService.logOut();
    this._dashService.emitLogin();
  }
}
