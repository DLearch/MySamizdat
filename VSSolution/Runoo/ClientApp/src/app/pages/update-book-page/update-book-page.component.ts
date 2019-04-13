import { Component, OnInit } from '@angular/core';
import { InputTemplate } from 'src/app/components/form/input-template';
import { GetBookApiResponse } from 'src/app/api/book/get-book-api-response';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';
import { LanguageControllerService } from 'src/app/api/language/language-controller.service';
import { BookControllerService } from 'src/app/api/book/book-controller.service';
import { BookStateControllerService } from 'src/app/api/book-state/book-state-controller.service';
import { Validators, FormGroup } from '@angular/forms';
import { AppValidators } from 'src/app/app-validators';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-update-book-page',
  templateUrl: './update-book-page.component.html',
  styleUrls: ['./update-book-page.component.css']
})
export class UpdateBookPageComponent implements OnInit {

  componentTK = 'page.edit-book.';

  formTemplate: InputTemplate[];
  formErrors: any;

  bookStateTKs: string[];
  languageTKs: string[];
  bookId: number;
  book: GetBookApiResponse;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private router: Router,
    private languageController: LanguageControllerService,
    private bookStateController: BookStateControllerService,
    private bookController: BookControllerService
  ) {
    this.startPageLoad();
  }

  ngOnInit() {

    this.bookId = +this.route.snapshot.paramMap.get('book');


    this.loadBookStates().subscribe(() => {

      this.loadLanguageTKs().subscribe(() => {

        this.loadBook().subscribe(() => {

          this.createForm();
          this.finishPageLoad();
        }, () => {
          this.finishPageLoad();
        });
      });
    });

  }

  createForm() {

    let langSelectElements = [];

    for (let languageTK of this.languageTKs)
      langSelectElements.push({ value: languageTK, tk: 'language.' + languageTK });

    let stateSelectElements = [];

    for (let bookStateTK of this.bookStateTKs)
      stateSelectElements.push({ value: bookStateTK, tk: 'book-state.' + bookStateTK });

    let formTemplate: InputTemplate[] = [
      {
        name: 'description',
        tk: 'book.description',
        type: 'textarea',
        value: this.book.description
      },
      {
        name: 'authorName',
        tk: 'book.author',
        value: this.book.authorName
      },
      {
        name: 'stateComment',
        tk: 'book.state-comment',
        value: this.book.bookStateComment
      },
      {
        name: 'userName',
        tk: 'book.user',
        validators: [Validators.required, AppValidators.userName],
        value: this.book.user.userName
      },
      {
        name: 'teamName',
        tk: 'book.team',
        validators: [AppValidators.userName],
        value: this.book.teamName
      },
      {
        name: 'stateTK',
        tk: 'book.state',
        type: 'select',
        validators: [Validators.required],
        selectElements: stateSelectElements,
        value: this.book.bookStateTK
      }
    ];

    if (this.book.discriminator == 'TranslateBook') {
      formTemplate.push(
        {
          name: 'originalLanguageTK',
          tk: 'book.original-language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements,
          value: this.book.originalLanguageTK
        },
        {
          name: 'originalTitle',
          tk: 'book.original-title',
          value: this.book.originalTitle,
          validators: [Validators.required]
        },
        {
          name: 'title',
          tk: 'book.translate-title',
          value: this.book.title,
          validators: [Validators.required]
        },
        {
          name: 'languageTK',
          tk: 'book.translate-language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements,
          value: this.book.languageTK
        }
      );
    }
    else {
      formTemplate.push(
        {
          name: 'title',
          tk: 'book.title',
          value: this.book.title,
          validators: [Validators.required]
        },
        {
          name: 'languageTK',
          tk: 'book.language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements,
          value: this.book.languageTK
        }
      );
    }

    this.formTemplate = formTemplate;
  }

  loadLanguageTKs(): Observable<void> {

    return this.languageController
      .get()
      .pipe(map(languageTKs => {

        this.languageTKs = languageTKs;
      }));
  }

  loadBookStates(): Observable<void> {

    return this.bookStateController
      .get()
      .pipe(map(bookStateTKs => {

        this.bookStateTKs = bookStateTKs;
      }));
  }

  loadBook(): Observable<void> {

    return this.bookController
      .get(this.bookId)
      .pipe(
        map(response => {
          this.book = response;
        }),
        catchError(response => {
          this.pageService.error = { error: '404', descriptionTK: 'error.book-not-found' };

          return throwError(response);
        })
      );
  }

  post(form: FormGroup) {

    if (form.valid) {

      this.bookId = +this.route.snapshot.paramMap.get('book');

      this.bookController
        .update(this.bookId, form.value)
        .subscribe(response => {
          this.router.navigate(['/book', this.bookId]);
        },
          response => {
            this.formErrors = response;
          }
        );
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  startPageLoad() {
    this.pageService.loaded = false;
  }

  finishPageLoad() {
    this.pageService.loaded = true;
  }
}
