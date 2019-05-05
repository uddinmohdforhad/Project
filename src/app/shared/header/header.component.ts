import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  customer = {
    isLoggedIn: false,
    email: ""
  }
  constructor(private _auth: AuthService) { }

  async ngOnInit() {
    this._auth.getEmitter().subscribe(
      (customerObj) => {
        this.customer = customerObj
        console.log(this.customer)
      })
  }

  logOut(){
    this._auth.logOut();
    this._auth.emitLogin();
  }
}
