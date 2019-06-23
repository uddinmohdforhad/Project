import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'dashboard-header',
  templateUrl: './dashboardheader.component.html',
  styleUrls: ['./dashboardheader.component.css']
})
export class DashboardHeaderComponent implements OnInit {

  customer = {
    isLoggedIn: false,
    email: ""
  }
  constructor(private _auth: AuthService) { }

  async ngOnInit() {
    this._auth.getEmitter().subscribe(
      (customerObj) => {
        this.customer = customerObj
      })
  }

  logOut(){
    this._auth.logOut();
    this._auth.emitLogin();
  }
}
