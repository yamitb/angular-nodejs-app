import { Injectable } from '@angular/core';
import { of, Observable, Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Book } from '../models/Book';



@Injectable({
  providedIn: 'root'
})
export class BooksService {

  books: Book[];
  private booksUpdated = new Subject<Book[]>();

  constructor(private http: HttpClient) {
  }

  getbooks() {
    this.http.get<{ message: string, books: any }>('http://localhost:3000/books')
      .subscribe((responseData) => {
       // console.log(responseData.books);
        this.books = responseData.books;
        this.booksUpdated.next([...this.books]);
      });
  }
  
  getBooksUpdatedListener() {
    return this.booksUpdated.asObservable();
  }

  addBook(book: Book) {
    this.http.post<{ message: string, bookId: string}>('http://localhost:3000/books', book).subscribe(responseData => {
      console.log();
      book.id = responseData.bookId;
      //book.userId = responseData.userId;
      this.books.unshift(book);
      this.booksUpdated.next([...this.books]);
    }
    );
  }

  removeBook(bookId: string){
    this.http.delete<{ message: string, bookId: number }>('http://localhost:3000/books/'+ bookId).subscribe(responseData => {
      this.books = this.books.filter(book => book.id !== bookId);
      this.booksUpdated.next([...this.books]);
    }
    );
  }

 

  // addUser(book: Book) {
  //   this.http.post<{ message: string, userId: string }>('http://localhost:3000/books', Book).subscribe(responseData => {
  //     user.id = responseData.userId;
  //     this.users.unshift(user);
  //     this.usersUpdated.next([...this.users]);
  //   }
  //   );
  // }

  // removeUser(userId: string) {
  //   this.http.delete<{ message: string }>('http://localhost:3000/users/' + userId).subscribe((responseData) => {
  //     this.users = this.users.filter(user => user.id !== userId);
  //     this.usersUpdated.next([...this.users]);
  //   });
  // }

  // updateUser(user: User) {
  //   this.http.patch<{ message: string }>('http://localhost:3000/users', user).subscribe((responseData) => {
  //     this.users.forEach((cur, index) => {
  //       if (user.id === cur.id) {
  //         this.users.splice(index, 1);
  //       }
  //     });
  //     this.users.unshift(user);
  //     this.usersUpdated.next([...this.users]);
  //   });



  // }

  // editUser(user: User) {
  //   this.userSource.next(user);
  // }

}

