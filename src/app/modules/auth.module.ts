import { NgModule } from "../../../node_modules/@angular/core";
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AngularMaterialModule } from '../angular-material.module';

import { FormsModule} from '@angular/forms';
import { CommonModule } from "@angular/common"
import { RouterModule } from "../../../node_modules/@angular/router";
import { AuthRoutingModule } from "../app-routing/auth-routing.module";

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent
  ],
 imports: [
  AngularMaterialModule,
  FormsModule,
  CommonModule,
  AuthRoutingModule
 ]
})

export class AuthModule{}