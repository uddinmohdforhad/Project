import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'web-header',
  templateUrl: './webheader.component.html',
  styleUrls: ['./webheader.component.css']
})
export class WebHeaderComponent implements OnInit {

  customer = {
    isLoggedIn: false,
    email: ""
  }
  constructor(private _auth: AuthService,
              private _router: Router) { }

  async ngOnInit() {
    this._auth.emitLogin();
    this._auth.getEmitter().subscribe(
      (customerObj) => {
        this.customer = customerObj
      })
  }

  logOut(){
    this._auth.logOut();
    this._auth.emitLogin();
    this._router.navigate(['/'])
  }
}
