import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common"
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModuls } from "@angular/forms";
import { 
  MatProgressSpinnerModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';

//import components
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MyClosetComponent } from './components/my-closet/my-closet.component';
import { SearchComponent } from './components/search/search.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MyPicturesComponent } from './components/my-pictures/my-pictures.component';
import { AddPictureComponent } from './components/add-picture/add-picture.component';
import { EditPictureComponent } from './components/edit-picture/edit-picture.component';

//import services
import { UsersService } from './services/users.service';
import { PostsService } from './services/posts.service';
import { PostsComponent } from './components/posts/posts.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostComponent } from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserFormComponent } from './components/user-form/user-form.component';
@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    NavbarComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    MyClosetComponent,
    SearchComponent,
    MyPicturesComponent,
    AddPictureComponent,
    EditPictureComponent,
    PostsComponent,
    PostFormComponent,
    PostComponent,
    NotFoundComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSelectModule,
    BrowserAnimationsModule,
    ReactiveFormsModuls
  ],
  providers: [UsersService, PostsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
