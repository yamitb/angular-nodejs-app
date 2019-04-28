import { Component, OnInit,ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';
import { Subscription } from '../../../../node_modules/rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  @ViewChild('signupForm') form: any;
  private authStatus: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  this.authStatus = this.authService.getAuthStatusListener().subscribe(authStatus =>{
    if(!authStatus){
      this.isLoading = false;
    }
  });
  }

  

  onSignup(form: NgForm){
    if(form.invalid){
      console.log("Form is invalid!");
      return;
    }
    this.isLoading = true;
    const user: User = {
       id: null,
       firstName: form.value.firstName,
       lastName: form.value.lastName,
       email: form.value.email,
       password: form.value.password,
       registered: new Date()
    }
  
   this.authService.createUser(user);

   this.form.reset();
  }

  ngOnDestroy(){
    this.authStatus.unsubscribe();
  }

}
