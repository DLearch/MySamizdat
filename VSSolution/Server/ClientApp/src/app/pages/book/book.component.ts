import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(
    private bookService: BookService
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const bookId: number = +this.route.snapshot.paramMap.get('book');

    this.bookService.get(bookId).subscribe(
      book => this.book = book
      , error => console.log(error)
    );
  }

}
