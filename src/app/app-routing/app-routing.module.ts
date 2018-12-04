import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { SearchComponent } from '../components/search/search.component';
import { MyClosetComponent } from '../components/my-closet/my-closet.component';
import { UsersComponent } from '../components/users/users.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostComponent } from '../components/post/post.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { UserComponent } from '../components/user/user.component';



const routes: Routes = [
{path: '', component: DashboardComponent},
{path: 'login', component: LoginComponent},
{path: 'register', component: RegisterComponent},
{path: 'search', component: SearchComponent},
{path: 'my-closet', component: MyClosetComponent},
{path: 'users', component: UsersComponent},
{path: 'user/:id',component: UserComponent},
{path: 'posts', component: PostsComponent},
{path: 'post/:id', component: PostComponent},
{path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  declarations: []
})
export class AppRoutingModule { }
