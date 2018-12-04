import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';
import { of, Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { User } from '../models/User';
//import { currentId } from 'async_hooks';
//import { Observable, observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[];
  private usersUpdated = new Subject<User[]>();
  data: Observable<any>;
  user1: User;

  private userSource = new BehaviorSubject<User>({
    id: null, lastName: null, firstName: null, email: null
  });

  selectedUser = this.userSource.asObservable();

  constructor(private http: HttpClient) {
  }

  getUsers() {
    this.http.get<{ message: string, users: any }>('http://localhost:3000/users')
      .pipe(map((usersData) => {
        return usersData.users.map(user => {
          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            registered: user.joined,
            hide: true
          };
        });
      }))
      .subscribe((transformedUsers) => {
        this.users = transformedUsers;
        this.usersUpdated.next([...this.users]);
      });
    //return of(this.users);
  }

  getUser(id:string):any{ //can do hhtp request to get user from db (lecture 67 - part )
      for (var i in this.users) {
        if(this.users[i].id == id){
          return this.users[i]
        }
      } 
  }
  
  getUsersUpdatedListener() {
    return this.usersUpdated.asObservable();
  }

  addUser(user: User) {
    this.http.post<{ message: string, userId: string }>('http://localhost:3000/users', user).subscribe(responseData => {
      user.id = responseData.userId;
      this.users.unshift(user);
      this.usersUpdated.next([...this.users]);
    }
    );
  }

  removeUser(userId: string) {
    this.http.delete<{ message: string }>('http://localhost:3000/users/' + userId).subscribe((responseData) => {
      this.users = this.users.filter(user => user.id !== userId);
      this.usersUpdated.next([...this.users]);
    });
  }

  updateUser(user: User) {
    this.http.patch<{ message: string }>('http://localhost:3000/users', user).subscribe((responseData) => {
      this.users.forEach((cur, index) => {
        if (user.id === cur.id) {
          this.users.splice(index, 1);
        }
      });
      this.users.unshift(user);
      this.usersUpdated.next([...this.users]);
    });



  }

  editUser(user: User) {
    this.userSource.next(user);
  }

}
