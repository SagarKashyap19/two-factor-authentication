import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../sign-in/custom-validators";
import { AuthService } from "src/app/services/auth.service";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

// var bcrypt = require("bcryptjs");

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  public frmSignup: FormGroup;
  tokenFromUI: string = "0123456789123456";
  encrypted: any = "";
  decrypted: string;

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.frmSignup = this.createSignupForm();
  }

  createSignupForm(): FormGroup {
    return this.fb.group(
      {
        Email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        Password: [
          null,
          Validators.compose([
            Validators.nullValidator,
            Validators.required,
            // check whether the entered password has a number
            CustomValidators.patternValidator(/\d/, {
              hasNumber: true
            }),
            // check whether the entered password has upper case letter
            CustomValidators.patternValidator(/[A-Z]/, {
              hasCapitalCase: true
            }),
            // check whether the entered password has a lower case letter
            CustomValidators.patternValidator(/[a-z]/, {
              hasSmallCase: true
            }),
            // check whether the entered password has a special character
            CustomValidators.patternValidator(
              /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
              {
                hasSpecialCharacters: true
              }
            ),
            Validators.minLength(8)
          ])
        ],
        ConfirmPassword: [null, Validators.compose([Validators.required])]
      },
      {
        // check whether our password and confirm password match
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  encryptUsingAES256AndSubmit() {
    // let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    // let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    // let encrypted = CryptoJS.AES.encrypt(
    //   JSON.stringify(this.frmSignup.controls['Password'].value), _key, {
    //     keySize: 30,
    //     iv: _iv,
    //     mode: CryptoJS.mode.ECB,
    //     padding: CryptoJS.pad.Pkcs7
    //   });
    // this.encrypted = encrypted.toString();
    // console.log(this.encrypted)
    this.authService.signUp(this.frmSignup.value).subscribe(() => {
      this.router.navigate(['/log-in'])
    }, (error) => {
      console.log("Error")
    })
  }

  submit() {
    this.encryptUsingAES256AndSubmit()
  }
}
