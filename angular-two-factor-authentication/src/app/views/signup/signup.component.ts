import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CustomValidators } from "../sign-in/custom-validators";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
      ]
    });
  }

  submit() {
    // this.isOtp = true;
    this.authService.signIn(this.frmSignIn.value).subscribe(() => {
      this.isOtp = true
    })
  }
}
