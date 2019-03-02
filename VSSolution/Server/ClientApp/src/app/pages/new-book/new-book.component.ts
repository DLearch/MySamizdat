import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { LanguageControllerService } from 'src/app/api-services/language-controller/language-controller.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  public mainForm: FormGroup;
  public translateForm: FormGroup;
  languageTKs: string[];
  isTranslate: boolean = false;

  constructor(
    private bookController: BookControllerService
    , formBuilder: FormBuilder
    , private router: Router
    , private languageController: LanguageControllerService
  ) {

    this.translateForm = formBuilder.group({

      'title': ['', [Validators.required]],
      'languageTK': ['', [Validators.required]],
      'originalTitle': ['', [Validators.required]],
      'originalLanguageTK': ['', [Validators.required]]
    });
    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]],
      'languageTK': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {

    this.languageController
      .getLanguages()
      .subscribe(languageTKs => this.languageTKs = languageTKs);
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {

      let observable$: Observable<number> = null;

      if (this.isTranslate) {

        observable$ = this.bookController.addBook(
          this.mainForm.value.title,
          this.mainForm.value.languageTK
        );
      }
      else {
        observable$ = this.bookController.addTranslateBook(
          this.translateForm.value.title,
          this.translateForm.value.languageTK,
          this.translateForm.value.originalTitle,
          this.translateForm.value.originalLanguageTK
        );
      }
      
      observable$.subscribe(
        bookId => this.router.navigate([`book/${bookId}`])
        , response => setErrors(response, this.mainForm)
      );
    }
  }
}
