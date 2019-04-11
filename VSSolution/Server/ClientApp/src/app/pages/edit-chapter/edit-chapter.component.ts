import { Component, OnInit } from '@angular/core';
import { GetChapterRVM } from 'src/app/api-services/chapter-controller/get-chapter-rvm';
import { InputTemplate } from 'src/app/components/form/input-template';
import { PageService } from 'src/app/services/page/page.service';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-chapter',
  templateUrl: './edit-chapter.component.html',
  styleUrls: ['./edit-chapter.component.css']
})
export class EditChapterComponent implements OnInit {

  componentTK = 'page.edit-book.';

  formTemplate: InputTemplate[];
  formErrors: any;

  bookId: number;
  chapterId: number;

  chapter: GetChapterRVM;
  constructor(
    private pageService: PageService,
    private router: Router,
    private route: ActivatedRoute,
    private chapterController: ChapterControllerService
  ) {
    this.startPageLoad();
  }

  ngOnInit() {

    this.bookId = +this.route.snapshot.paramMap.get('book');
    this.chapterId = +this.route.snapshot.paramMap.get('chapter');

    this.loadChapter().subscribe(() => {

      this.createForm();
      this.finishPageLoad();
    }, () => {
      this.finishPageLoad();
    });
  }

  createForm() {

    this.formTemplate = [
      {
        name: 'name',
        tk: 'chapter.name',
        value: this.chapter.name
      },
      {
        name: 'content',
        tk: 'chapter.content',
        type: 'textarea',
        value: this.chapter.content
      }
    ];

  }
  loadChapter(): Observable<void> {

    return this.chapterController
      .getChapter(this.chapterId)
      .pipe(
        map(response => {
          this.chapter = response;
        }),
        catchError(response => {
          this.pageService.error = { error: '404', descriptionTK: 'error.chapter-not-found' };

          return throwError(response);
        })
      );
  }

  post(form: FormGroup) {

    if (form.valid) {

      this.bookId = +this.route.snapshot.paramMap.get('book');
      this.chapterId = +this.route.snapshot.paramMap.get('chapter');

      this.chapterController
        .update(this.chapterId, form.value)
        .subscribe(response => {
          this.router.navigate(['/book', this.bookId, this.chapterId]);
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
