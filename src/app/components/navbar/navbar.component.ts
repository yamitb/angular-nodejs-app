import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  user: User = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
  }
  userIsAuthenticated: boolean = false;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();     
    console.log("this.user");
    console.log(this.user);
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
       this.userIsAuthenticated = isAuthenticated;
       this.user = this.authService.getUser();
    });
  }

  ngOnDestroy(){
     this.authListenerSubs.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}
