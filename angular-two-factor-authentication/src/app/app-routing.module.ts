import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./views/sign-in/sign-in.component";
import { SignupComponent } from './views/signup/signup.component';

const routes: Routes = [
  { path: "", redirectTo: "/log-in", pathMatch: "full" },
  { path: "log-in", component: SignInComponent },
  { path: 'sign-up', component: SignupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
