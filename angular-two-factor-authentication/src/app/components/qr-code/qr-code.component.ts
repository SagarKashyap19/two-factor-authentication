import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-qr-code",
  templateUrl: "./qr-code.component.html",
  styleUrls: ["./qr-code.component.scss"]
})
export class QrCodeComponent implements OnInit {
  public myAngularxQrCode: string = null;
  constructor() {
    this.myAngularxQrCode = 'otpauth://totp/Innspect?secret=K7NROGRSRQXJVVPC';
  }

  ngOnInit(): void {}
}
