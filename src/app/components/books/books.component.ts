import { Component, OnInit } from '@angular/core';
import { Book } from '../../models/Book';
import { PostsService } from '../../services/posts.service';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { Subscription } from '../../../../node_modules/rxjs';
import { User } from '../../models/User';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];
  userIsAuthanticated: boolean = false;
  private authListenerSub: Subscription;
  user: User;


  constructor(private booksService: BooksService,private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.booksService.getbooks();
    this.booksService.getBooksUpdatedListener().subscribe((books: Book[]) => {
      this.books = books;
        console.log(this.books);
        console.log(this.user);
    });

    this.authListenerSub = this.authService.getAuthStatusListener().subscribe(
      isAuthanticated =>{
      this.userIsAuthanticated = isAuthanticated;
      this.user = this.authService.getUser();
    });
    

  }

  removeBook(bookId: string){
    if(confirm('Are you sure?')){
      console.log(bookId);
      this.booksService.removeBook(bookId);
    }
}
}
