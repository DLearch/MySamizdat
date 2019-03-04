import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { LanguageControllerService } from 'src/app/api-services/language-controller/language-controller.service';
import { Observable } from 'rxjs';
import { FormComponent } from 'src/app/components/form/form.component';

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.css']
})
export class NewBookComponent implements OnInit {

  @ViewChild('form') formComponent: FormComponent;
  
  languageTKs: string[];
  isWaiting: boolean = false;
  private _isTranslate: boolean = false;

  set isTranslate(value: boolean) {

    this._isTranslate = value;

    let langSelectElements = [];

    for (let languageTK of this.languageTKs)
      langSelectElements.push({ value: languageTK, tk: 'language.' + languageTK });

    if (value) {

      this.formComponent.template = [
        {
          name: 'title',
          tk: 'book-title',
          validators: [Validators.required]
        },
        {
          name: 'originalTitle',
          tk: 'original-book-title',
          validators: [Validators.required]
        },
        {
          name: 'languageTK',
          tk: 'language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements
        },
        {
          name: 'originalLanguageTK',
          tk: 'original-language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements
        }
      ];
    }
    else {

      this.formComponent.template = [
        {
          name: 'title',
          tk: 'book-title',
          validators: [Validators.required]
        },
        {
          name: 'languageTK',
          tk: 'language',
          type: 'select',
          validators: [Validators.required],
          selectElements: langSelectElements
        }
      ];
    }
  }
  get isTranslate(): boolean {
    return this._isTranslate;
  }

  constructor(
    private bookController: BookControllerService
    , private router: Router
    , private languageController: LanguageControllerService
  ) { }

  ngOnInit(): void {

    this.isWaiting = true;
    this.languageController
      .getLanguages()
      .subscribe(languageTKs => {
        this.languageTKs = languageTKs;
        this.isTranslate = false;
        this.isWaiting = false;
      });
  }

  public submit(): void {

    if (this.formComponent.form.valid) {

      let observable$: Observable<number> = null;
      this.isWaiting = true;

      if (this.isTranslate) {

        observable$ = this.bookController.addTranslateBook(
          this.formComponent.form.value.title,
          this.formComponent.form.value.languageTK,
          this.formComponent.form.value.originalTitle,
          this.formComponent.form.value.originalLanguageTK
        );
      }
      else {
        observable$ = this.bookController.addBook(
          this.formComponent.form.value.title,
          this.formComponent.form.value.languageTK
        );
      }
      
      observable$.subscribe(
        bookId => this.router.navigate([`book/${bookId}`])
        , response => {
          this.isWaiting = false;
          this.formComponent.errors = response;
        }
      );
    }
  }
}
