import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "./custom-validators";
import { AuthService } from "src/app/services/auth.service";
import { Router } from '@angular/router';

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
    this.frmSignIn = this.createSignupForm();
    this.frmOtp = this.fb.group({
      otp: [''],
    })
  }

  createSignupForm(): FormGroup {
    return this.fb.group({
      Email: [
        null,
        Validators.compose([Validators.email, Validators.required])
      ],
      Password: [
        null,
        Validators.compose([
          Validators.required,
          Validators.minLength(8)
        ])
      ]
    });
  }

  getOtp() {
    this.authService.signIn(this.frmSignIn.value).subscribe(() => {
      this.isOtp = true
      this.loginError = false
    }, (error) => {
      this.loginError = true
    })
  }

  verifyOtp() {
    let payload = {
      "Email" : this.frmSignIn.controls['Email'].value,
      "Password" : this.frmSignIn.controls['Password'].value,
      "OTP": this.frmOtp.controls['otp'].value
    }
    this.authService.verifyOtp(payload).subscribe(() => {
      this.isOtp = true
      this.otpError = false
      this.router.navigate(['/user-profile'])
    }, (error) => {
      this.otpError = true
    })
  }
}
