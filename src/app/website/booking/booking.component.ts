import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { _MatAutocompleteMixinBase } from '@angular/material';

@Component({
  selector: 'booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingData = {
    date:"",
    capacity: "",
    token: ""
  }

  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  booktable(){
    this.bookingData.token = this._auth.getToken()
    this._auth.book(this.bookingData)
      .subscribe(
        res => {
          console.log(res)
          alert(res.message),
          this._router.navigate([''])
        },
        err => {
          alert(`Error: ${err.error.message}`)
        }
      )
  }
}
