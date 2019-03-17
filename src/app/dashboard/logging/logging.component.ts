import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'logging',
  templateUrl: './logging.component.html',
  styleUrls: ['./logging.component.css']
})
export class LoggingComponent implements OnInit {

  loginStaffData = { email:"", password: ""}
  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginStaff(){
    this._auth.loginStaff(this.loginStaffData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token)
      },
      err => console.log(err)
     )
  }
}
