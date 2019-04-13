import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material';
import { InputTemplate } from 'src/app/components/form/input-template';
import { BookControllerService } from 'src/app/api/book/book-controller.service';
import { LanguageControllerService } from 'src/app/api/language/language-controller.service';
import { PageService } from 'src/app/services/page/page.service';
import { Router } from '@angular/router';
import { Validators, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-book-page',
  templateUrl: './new-book-page.component.html',
  styleUrls: ['./new-book-page.component.css']
})
export class NewBookPageComponent implements OnInit {

  @ViewChild('stepper') stepper: MatStepper;

  componentTK = 'page.new-book.';

  private _isTranslate: boolean = false;
  set isTranslate(value: boolean) {

    this._isTranslate = value;
    
    if (this._isTranslate)
      this.setTranslateForms();
    else
      this.setBookForms();
  }
  get isTranslate(): boolean {
    return this._isTranslate;
  }

  languageTKs: string[] = [];

  languageFormTemplate: InputTemplate[] = [];
  languageFormErrors: any;
  
  titleFormTemplate: InputTemplate[] = [];
  titleFormErrors: any;

  constructor(
    private bookController: BookControllerService,
    private router: Router,
    private languageController: LanguageControllerService,
    private pageService: PageService
  ) {
    this.pageService.setTitleTK(this.componentTK + 'title');
    this.pageService.loaded = false;
  }

  ngOnInit() {

    this.languageController
      .get()
      .subscribe(languageTKs => {
        
        this.languageTKs = languageTKs;

        this.isTranslate = false;

        this.pageService.loaded = true;
      });
  }

  selectTranslate() {
    this.isTranslate = true;
    this.stepper.next();
  }

  selectBook() {
    this.isTranslate = false;
    this.stepper.next();
  }

  setTranslateForms() {

    let langSelectElements = [];

    for (let languageTK of this.languageTKs)
      langSelectElements.push({ value: languageTK, tk: 'language.' + languageTK });

    this.languageFormTemplate = [
      {
        name: 'languageTK',
        tk: 'book.translate-language',
        type: 'select',
        validators: [Validators.required],
        selectElements: langSelectElements
      },
      {
        name: 'originalLanguageTK',
        tk: 'book.original-language',
        type: 'select',
        validators: [Validators.required],
        selectElements: langSelectElements
      }
    ];

    this.titleFormTemplate = [
      {
        name: 'title',
        tk: 'book.translate-title',
        validators: [Validators.required]
      },
      {
        name: 'originalTitle',
        tk: 'book.original-title',
        validators: [Validators.required]
      }
    ];
  }

  setBookForms() {

    let langSelectElements = [];

    for (let languageTK of this.languageTKs)
      langSelectElements.push({ value: languageTK, tk: 'language.' + languageTK });

    this.languageFormTemplate = [
      {
        name: 'languageTK',
        tk: 'book.language',
        type: 'select',
        validators: [Validators.required],
        selectElements: langSelectElements
      }
    ];

    this.titleFormTemplate = [
      {
        name: 'title',
        tk: 'book.title',
        validators: [Validators.required]
      }
    ];
  }

  post(languageForm: FormGroup, titleForm: FormGroup) {

    if (languageForm.valid && titleForm.valid) {

      this.pageService.loaded = false;
      let observable$: Observable<number> = null;
      
      if (this.isTranslate) {

        observable$ = this.bookController.addTranslate({
          originalTitle: titleForm.value.originalTitle,
          originalLanguageTK: languageForm.value.originalLanguageTK,
          languageTK: languageForm.value.languageTK,
          title: titleForm.value.title
        });
      }
      else {
        observable$ = this.bookController.add({
          languageTK: languageForm.value.languageTK,
          title: titleForm.value.title
        });
      }

      observable$.subscribe(
        bookId => {
          this.router.navigate([`book/${bookId}`]);
          this.pageService.loaded = true;
        }
        , response => {
          this.titleFormErrors = response;
          this.languageFormErrors = response;
          this.pageService.loaded = true;
        }
      );
    }
    else for (let control in titleForm.controls)
      titleForm.controls[control].markAsTouched();
  }
}
