import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthGuard implements CanActivate{

  userIsAuthenticated = false;
  private authListenerSub: Subscription;

  constructor(private authService: AuthService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean 
  | Observable<boolean> | Promise<boolean> {
    const isAuth = this.authService.getIsAuth();
    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(
    isAuthenticated =>{
      console.log("isAuthenticated " + isAuthenticated);
      this.userIsAuthenticated = isAuthenticated;
      
      if(!this.userIsAuthenticated){
        this.router.navigate(['/auth/login']);
       }
       return this.userIsAuthenticated;
    });
    return isAuth;
    
  }

}