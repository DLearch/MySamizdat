import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { BookService } from './book.service';
import { CommentsService } from 'src/app/components/comments/comments.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  book: Book;

  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    const bookId: number = +this.route.snapshot.paramMap.get('book');

    this.bookService.get(bookId).subscribe(
      book => {
        this.book = book;
        this.commentsService.comments = book.comments;
        this.commentsService.entityId = book.id;
        this.commentsService.entityType = 'book';
      }
      , error => console.log(error)
    );
  }
}
