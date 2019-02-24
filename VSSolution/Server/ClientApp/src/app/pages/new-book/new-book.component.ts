import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NewBookService } from './new-book.service';
import { setErrors } from 'src/app/components/input/set-errors';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent {

  public mainForm: FormGroup;

  constructor(
    private newBookService: NewBookService
    , formBuilder: FormBuilder
    , private router: Router
  ) {

    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.newBookService
        .create(this.mainForm.value)
        .subscribe(
          bookId => this.router.navigate([`book/${bookId}`])
          , response => setErrors(response, this.mainForm)
        );
  }
}
