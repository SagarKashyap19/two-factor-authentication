import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import {catchError, map,} from 'rxjs/operators';
import {throwError} from 'rxjs';

import { User, UserOtp } from "../Models/User.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  endpoint = "http://localhost:58014/api/Login/GetUser";

  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}`, user)
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }

  verifyOtp(user: UserOtp) {
    return this.http
      .post<any>(`${this.endpoint}`, user)
      .subscribe((res: any) => {
        this.router.navigate(["user-details"]);
      });
  }
}
