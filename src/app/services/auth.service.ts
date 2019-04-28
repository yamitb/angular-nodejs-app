import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';
import { Subject,BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer:any;
  private isAuthenticated: boolean = false;
  private user: User;

  private authStatusListener = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient, private router: Router) { }

  getToken(){
    return this.token;
  }

  getUser(){
    console.log("user from 11111111111");
    console.log(this.user);
    return this.user;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  createUser(user: User){
     console.log("create user service");
     console.log(user);
    this.http.post<{ message: string, userId: string }>(BACKEND_URL + "/signup",user).subscribe(responseData =>{
      console.log("responseData.result " + responseData.message);
      console.log("responseData.userId " + responseData.userId);
      this.router.navigate(['/auth/login']);
    },error =>{
      console.log("errorr in create user");
      this.authStatusListener.next(false);
    });

  }
  loginUser(user: User){
     console.log("login user service");
    // console.log(user);
    this.http.post<{ token: string, expiresIn: number,user:User }>(BACKEND_URL + "/login",user).subscribe(responseData =>{  
      const token = responseData.token;
      console.log(token);
      console.log(responseData.user);
      this.token = token;
      this.user = responseData.user;
      if(token){
        const expiresInDuration = responseData.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.authStatusListener.next(true);
        const now = new Date();       
        console.log("user from auth service login");
        console.log(this.user);
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        console.log(expirationDate);
        this.saveAuthData(this.token,expirationDate,this.user);
        this.router.navigate(['/']);
      }
      console.log(this.user)
    
    },error => {
       this.authStatusListener.next(false);
    });
  }

  autoAuthUser(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.setAuthTimer(expiresIn/1000);
      this.isAuthenticated = true;
      this.user = authInformation.user;
      this.authStatusListener.next(true);
    }

    
  }

  logout(){
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
    this.token = null;
    this.isAuthenticated = false;
    this.user = null;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
  }

  private setAuthTimer(duration:number){
    console.log("setAuthTimer " + duration);
    this.tokenTimer = setTimeout(() =>{
      this.logout();
    },duration * 1000);
  }

  private saveAuthData(token:string, expirationDate:Date, user:User){
    console.log("expirationDateeeeeee " + expirationDate);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("user", JSON.stringify(user));
    console.log(this.user)
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("user");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const user = localStorage.getItem("user");
    if(!token || !expirationDate){
      return;
    }
    return{
      token: token,
      expirationDate: new Date(expirationDate),
      user: JSON.parse(user)
    }
  }
  
}
