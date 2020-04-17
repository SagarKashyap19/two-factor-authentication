import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "./custom-validators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-sign-in",
  templateUrl: "./sign-in.component.html",
  styleUrls: ["./sign-in.component.scss"]
})
export class SignInComponent implements OnInit {
  public frmSignIn: FormGroup;
  public frmOtp: FormGroup;
  public isOtp: boolean = false;

  constructor(private authService: AuthService, private fb: FormBuilder) {}

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

  submit() {
    this.authService.signIn(this.frmSignIn.value).subscribe(() => {
      this.isOtp = true
    })
  }
}
