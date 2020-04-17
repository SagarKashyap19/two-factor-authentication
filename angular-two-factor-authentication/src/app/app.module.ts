import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { OtpComponent } from './views/otp/otp.component';
import { SignupComponent } from './views/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    UserProfileComponent,
    OtpComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
