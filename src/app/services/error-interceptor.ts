import { HttpRequest, HttpInterceptor, HttpHandler, HttpErrorResponse } from "../../../node_modules/@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "../../../node_modules/rxjs/operators";
import { throwError } from "../../../node_modules/rxjs";
import { MatDialog } from "../../../node_modules/@angular/material";
import { ErrorComponent } from "../components/error/error.component";

@Injectable()

export class ErrorIntercepter implements HttpInterceptor{

  constructor(private dialog: MatDialog){}

  intercept(req:HttpRequest<any>, next:HttpHandler){

   return next.handle(req).pipe(
     catchError((error:HttpErrorResponse) =>{
       let errorMessage = "An unknown error occurred!"
       if(error.error.message){
        errorMessage = error.error.message;
       }
       this.dialog.open(ErrorComponent,{data: {message: errorMessage}});
       return throwError(error);
     })
   );
  }
}