import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"]
})
export class QrCodeComponent implements OnInit {
  public myAngularxQrCode: string = null;
  microsoftOtp: String = ""
  constructor(private authService: AuthService) {
    this.myAngularxQrCode = `otpauth://totp/Innspect?secret=${localStorage.getItem("valueqr")}`;
  }

  ngOnInit(): void {}

  handleOtp(ev: any) {
    this.microsoftOtp = ev.target.value;
  }

  validateMicrosoftOtp() {
    let payload = {
      "Email" : localStorage.getItem("Email"),
      "Password" : localStorage.getItem("Password"),
      "OTP": this.microsoftOtp
    }
    this.authService.verifyMicrosoftOtp(payload).subscribe(() => {
      console.log("Done")
    }, (error) => {
      console.log("Error")
    })
  }
}
