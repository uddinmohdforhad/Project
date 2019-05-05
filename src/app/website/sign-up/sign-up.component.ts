import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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

  hidePassword = true;
  hideConfirmPassword = true;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }
  
  createAccount() {
    if(this.formHasErrors() == false){
      var newCustomer = {
        email: this.emailFormControl.value,
        password: this.passwordFormControl.value,
        name: this.nameFormControl.value,
        number: this.numberFormControl.value,
        address: this.addressFormControl.value,
        postCode: this.postCodeFormControl.value
      }
      this._authService.signUp(newCustomer)
      .subscribe(
        res => {
          console.log(res)
          localStorage.setItem('token', res.token);
          alert('You have registered successfully')
          this._authService.emitLogin();
          this._router.navigate([''])
        },// redirect to home and logged in
        err => {
          alert(`Error: ${err.error.message}`)
        }
      )
    }
  }

  formHasErrors(){
    if(this.emailFormControl.errors
      || this.passwordFormControl.errors
      || this.confirmPasswordFormControl.errors
      || this.nameFormControl.errors
      || this.numberFormControl.errors
      || this.addressFormControl.errors
      || this.postCodeFormControl.errors) {
        console.log("has errors")
        return true
    } else {
      return false
    }
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