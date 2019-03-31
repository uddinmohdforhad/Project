import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  nameFormControl = new FormControl('', [Validators.required]);
  numberFormControl = new FormControl('', [Validators.required]);
  addressFormControl = new FormControl('', [Validators.required]);
  postCodeFormControl = new FormControl('', [Validators.required]);
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  passwordFormControl = new FormControl('', [Validators.required]);
  confirmPasswordFormControl = new FormControl('', [Validators.required, ConfirmPasswordValidator(this.passwordFormControl.value)]);
  passwordOnChange(){
    this.confirmPasswordFormControl.setValidators([Validators.required, ConfirmPasswordValidator(this.passwordFormControl.value)])
  }

  customer = {
    email: "",
    password: "",
    name: "",
    number: "",
    address: "",
    postCode: ""
  }
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
  }
  
  createAccount() {
    this._authService.signUp(this.customer)
    .subscribe(
      res => console.log(res),// redirect to home and logged in
      err => console.log(err) // pop up alert with error
    )
  }

}

export function ConfirmPasswordValidator(compareTo: string): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    if (compareTo !== control.value) {
      return { 'notEqual': true }
    }
    return null
  };
}