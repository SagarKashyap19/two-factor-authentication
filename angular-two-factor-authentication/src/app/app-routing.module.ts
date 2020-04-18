import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignupComponent } from './views/signup/signup.component';
import { UserProfileComponent } from './views/user-profile/user-profile.component';
import { QrCodeComponent } from './components/qr-code/qr-code.component';

const routes: Routes = [
  { path: "", redirectTo: "/log-in", pathMatch: "full" },
  { path: "log-in", component: SignInComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'Qr-code', component: QrCodeComponent },
  { path: 'user-profile', component: UserProfileComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
