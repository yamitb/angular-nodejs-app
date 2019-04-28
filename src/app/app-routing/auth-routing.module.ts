import { NgModule } from "../../../node_modules/@angular/core";
import { Routes, RouterModule } from "../../../node_modules/@angular/router";

import { SignupComponent } from '../components/signup/signup.component';
import { LoginComponent } from '../components/login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent},
]

@NgModule({
  imports:[RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class AuthRoutingModule{}