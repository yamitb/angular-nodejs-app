import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Subscription } from '../../../../node_modules/rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  email='';
  @ViewChild('loginForm') form: any;
  private authStatus: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authStatus = this.authService.getAuthStatusListener().subscribe(authStatus =>{
      if(!authStatus){
        this.isLoading = false;
      }
    });
    }

  onLogin(form: NgForm){
    if(form.invalid){
      console.log("Form is invalid!");
      return;
    }
    this.isLoading = true;
    const user: User = {
       id: null,
       firstName: null,
       lastName: null,
       email: form.value.email,
       password: form.value.password,
    }
  
   this.authService.loginUser(user);
    this.form.reset();
 
  }

  ngOnDestroy(): void {
    this.authStatus.unsubscribe();
  }

}
