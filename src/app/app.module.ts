import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CommonModule } from "@angular/common"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { ReactiveFormsModuls } from "@angular/forms";


//import components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyClosetComponent } from './components/my-closet/my-closet.component';
import { SearchComponent } from './components/search/search.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MyPicturesComponent } from './components/my-pictures/my-pictures.component';
import { EditPictureComponent } from './components/edit-picture/edit-picture.component';

//import services
import { UsersService } from './services/users.service';
import { PostsService } from './services/posts.service';
import { AuthService } from './services/auth.service';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostComponent } from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { AuthIntercepter } from './services/auth-interceptor';
import { BooksComponent } from './components/books/books.component';
import { BookFormComponent } from './components/book-form/book-form.component';
import { ErrorIntercepter } from './services/error-interceptor';
import { ErrorComponent } from './components/error/error.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { AngularMaterialModule } from './angular-material.module';
import { SearchFormComponent } from './components/search-form/search-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    DashboardComponent,
    MyClosetComponent,
    SearchComponent,
    MyPicturesComponent,
    EditPictureComponent,
    PostsComponent,
    PostFormComponent,
    PostComponent,
    NotFoundComponent,
    UserFormComponent,
    BooksComponent,
    BookFormComponent,
    ErrorComponent,
    ItemFormComponent,
    SearchFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    AngularMaterialModule,
    //ReactiveFormsModuls
  ],
  providers: [UsersService, PostsService,AuthService,
    {provide:HTTP_INTERCEPTORS,useClass: AuthIntercepter,multi: true},
    {provide:HTTP_INTERCEPTORS,useClass: ErrorIntercepter,multi: true}],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
