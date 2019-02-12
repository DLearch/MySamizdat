import { Component } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setErrors } from 'src/app/components/input/set-errors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-creating',
  templateUrl: './book-creating.component.html',
  styleUrls: ['./book-creating.component.css']
})
export class BookCreatingComponent {

  public mainForm: FormGroup;

  constructor(
    private bookService: BookService
    , formBuilder: FormBuilder
    , private router: Router
  ) {

    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.bookService
        .create(this.mainForm.value)
        .subscribe(
          bookId => this.router.navigate([`book/${bookId}`])
          , response => setErrors(response, this.mainForm)
        );
  }
}
