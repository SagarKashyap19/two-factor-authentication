import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';
import * as shajs from 'sha.js';

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  public frmSignIn: FormGroup;
  public frmOtp: FormGroup;
  public isOtp: boolean = false;
  public loginError:boolean = false;
  public otpError:boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder, public router: Router) {}

  ngOnInit(): void {
    this.frmSignIn = this.fb.group({
    Email: [''],
    Password: ['']
    })
    this.frmOtp = this.fb.group({
      otp: [''],
    })
  }

  getOtp() {
    let encrypt = shajs('sha256').update(this.frmSignIn.controls['Password'].value).digest('hex')
    let payload = {
      Email: this.frmSignIn.controls['Email'].value,
      Password: encrypt
    }
    this.authService.signIn(payload).subscribe(() => {
      this.isOtp = true
      this.loginError = false
    }, (error) => {
      this.loginError = true
    })
  }

  verifyOtp() {
    let encrypt = shajs('sha256').update(this.frmSignIn.controls['Password'].value).digest('hex')
    let payload = {
      "Email" : this.frmSignIn.controls['Email'].value,
      "Password" : encrypt,
      "OTP": this.frmOtp.controls['otp'].value
    }
    this.authService.verifyOtp(payload).subscribe(() => {
      this.isOtp = true
      this.otpError = false
      this.router.navigate(['/user-profile'])
      localStorage.setItem("Email",this.frmSignIn.controls['Email'].value)
      localStorage.setItem("Password",encrypt)
    }, (error) => {
      this.otpError = true
    })
  }
}
