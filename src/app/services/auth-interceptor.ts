import { HttpRequest, HttpInterceptor, HttpHandler } from "../../../node_modules/@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()

export class AuthIntercepter implements HttpInterceptor{

  constructor(private authService: AuthService){}

  intercept(req:HttpRequest<any>, next:HttpHandler){

   const authToken = this.authService.getToken();
   console.log("intercept requestttt");
   console.log("authToken " + authToken);
   const authRequest = req.clone({
     headers: req.headers.set("Authorization", "Bearer " + authToken)
   });
   return next.handle(authRequest);
  }
}