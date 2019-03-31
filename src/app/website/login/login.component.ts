import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  customerData = {
    email: "",
    password: ""
  }

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginCustomer(){
    this._auth.logIn(this.customerData)
    .subscribe(
      res => {
        console.log(res),
        localStorage.setItem('token', res.token)
        this._router.navigate([''])
      },// redirect to home and logged in
      err => {
        alert(`Error: ${err.error.message}`)
      }
    )
  }
}
