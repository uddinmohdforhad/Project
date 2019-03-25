import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  loginStaffData = { email:"", password: ""}
  constructor(private _dashService: DashboardService) { }

  ngOnInit() {
  }

  loginStaff(){
    this._dashService.loginStaff(this.loginStaffData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
     )
  }
}
