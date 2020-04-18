import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"]
})
export class UserProfileComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  configure() {
    let payload = {
      Email: localStorage.getItem("Email"),
      Password: localStorage.getItem("Password")
    };
    this.authService.configure(payload).subscribe(
      data => {
        localStorage.setItem("valueqr", data);
        this.router.navigate(['/Qr-code'])
      },
      error => {
        console.log("Error");
      }
    );
  }
}
