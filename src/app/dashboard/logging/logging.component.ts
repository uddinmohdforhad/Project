import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  loginStaffData = {}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginStaff(){
    this._auth.loginStaff(this.loginStaffData)
    .subscribe(
      res => console.log(res),
      err => console.log(err)
     )
  }
}
