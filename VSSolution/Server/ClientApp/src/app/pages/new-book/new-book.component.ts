import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { LanguageControllerService } from 'src/app/api-services/language-controller/language-controller.service';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  public mainForm: FormGroup;
  languageTKs: string[];
  isTranslate: boolean = false;

  constructor(
    private bookController: BookControllerService
    , formBuilder: FormBuilder
    , private router: Router
    , private languageController: LanguageControllerService
  ) {

    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]],
      'languageTK': ['', [Validators.required]],
      'originalTitle': ['', []]
    });
  }

  ngOnInit(): void {

    this.languageController
      .getLanguages()
      .subscribe(languageTKs => this.languageTKs = languageTKs);
  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.bookController.addBook(
        this.mainForm.value.title,
        this.mainForm.value.languageTK,
        this.isTranslate ? this.mainForm.value.originalTitle : null
      )
        .subscribe(
          bookId => this.router.navigate([`book/${bookId}`])
          , response => setErrors(response, this.mainForm)
        );
  }
}
