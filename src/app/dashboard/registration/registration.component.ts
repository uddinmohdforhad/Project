import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  newStaffData = {
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    information: {
      age: -1
    },
  }
  nameFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  constructor(private _dashService: DashboardService) { }

  ngOnInit() {
  }

  generatePassword(){
    var newPass = generateRandomString(10);
    this.newStaffData.password = newPass;
  }

  createAccount() {
    this._dashService.addStaff(this.newStaffData)
    .subscribe(
      res => alert("Staff was added"),
      err => alert("error")
    )
  }
}

function generateRandomString(length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}