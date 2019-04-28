import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { SearchComponent } from '../components/search/search.component';
import { MyClosetComponent } from '../components/my-closet/my-closet.component';
import { UsersComponent } from '../components/users/users.component';
import { PostsComponent } from '../components/posts/posts.component';
import { PostComponent } from '../components/post/post.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { UserComponent } from '../components/user/user.component';
import { AuthGuard } from '../services/auth.guard';
import { BooksComponent } from '../components/books/books.component';



const routes: Routes = [
{path: '', component: DashboardComponent},
{path: 'search', component: SearchComponent,canActivate:[AuthGuard]},
{path: 'my-closet', component: MyClosetComponent,canActivate:[AuthGuard]},
{path: 'users', component: UsersComponent,canActivate:[AuthGuard]},
{path: 'user/:id',component: UserComponent,canActivate:[AuthGuard]},
{path: 'books', component: BooksComponent,canActivate:[AuthGuard]},
{path: 'book/:id',component:  BooksComponent,canActivate:[AuthGuard]},
{path: 'posts', component: PostsComponent,canActivate:[AuthGuard]},
{path: 'post/:id', component: PostComponent,canActivate:[AuthGuard]},
{path: 'auth' , loadChildren: "../modules/auth.module#AuthModule"},
{path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard],
  declarations: []
})
export class AppRoutingModule { }
