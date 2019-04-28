import { Component, OnInit, ViewChild } from '@angular/core';
import { Book } from '../../models/Book';
import { BooksService } from '../../services/books.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/User';

@Component({
  selector: 'app-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.css']
})
export class BookFormComponent implements OnInit {
  book: Book = {
    id: '',
    title: '',
    body: '',
    userId: ''
  }

  @ViewChild('bookForm') form: any;
  user: User;

  constructor(private booksService: BooksService,private authService: AuthService) { }

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  onSubmit({value, valid} : {value: Book, valid: boolean}){
    if(!valid){
      console.log("Form is not valid!");
     }
      value.id = null;
      value.userId = this.user.id;;
      this.booksService.addBook(value);
      this.form.reset();
    }
}
