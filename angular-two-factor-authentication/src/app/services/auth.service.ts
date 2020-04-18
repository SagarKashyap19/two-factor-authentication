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

  endpoint = "http://localhost:58014/api/Login";

  signIn(user: User) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http
      .post<any>(`${this.endpoint}/GetUser`, user, {headers: headers})
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }

  verifyOtp(user: UserOtp) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http
      .post<any>(`${this.endpoint}/GetUser`, user, {headers: headers})
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }

  configure(user: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http
      .post<any>(`${this.endpoint}/Configure`, user, {headers: headers})
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }

  signUp(user: User) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http
      .post<any>(`${this.endpoint}/PostUser`, user, {headers: headers})
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }

  verifyMicrosoftOtp(user: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http
      .post<any>(`${this.endpoint}/ValidateMicrosoftOTP`, user, {headers: headers})
      .pipe(
        map(data => data),
        catchError(e => throwError(e))
      );
  }
}
