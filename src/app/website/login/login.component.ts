import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private _auth: AuthService) { }

  ngOnInit() {
  }

  loginCustomer(){
    
  }
}
