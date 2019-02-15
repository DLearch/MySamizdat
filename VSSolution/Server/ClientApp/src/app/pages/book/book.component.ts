import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setErrors } from 'src/app/components/input/set-errors';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  public commentForm: FormGroup;
  book: Book;

  constructor(
    formBuilder: FormBuilder
    , private bookService: BookService
    , private route: ActivatedRoute
  ) {

    this.commentForm = formBuilder.group({

      'content': ['', [Validators.required]]
    });
  }

  ngOnInit() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.bookService.get(id).subscribe(
      book => this.book = book
      , error => console.log(error)
    );
  }

  public commentSubmit(): void {

    if (this.commentForm.valid)
      this.bookService
        .comment(this.commentForm.value.content, this.book.id)
        .subscribe(
          () => this.book = this.book
          , response => setErrors(response, this.commentForm)
        );
  }
}
