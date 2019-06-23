import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class StaffLoggingComponent implements OnInit {

  loginStaffData = { email:"", password: ""}
  constructor(private _dashService: DashboardService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginStaff(){
    this._dashService.loginStaff(this.loginStaffData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('StaffToken', res.token),
        this._dashService.emitLogin();
        this._router.navigate(['/dashboard'])
      },
      err => {
        console.log(err),
        alert(`Error: invalid email or password`)
      }
     )
  }
}
