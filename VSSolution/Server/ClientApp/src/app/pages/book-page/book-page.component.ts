import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BookmarkControllerService } from 'src/app/api-services/bookmark-controller/bookmark-controller.service';
import { InputTemplate } from 'src/app/components/form/input-template';
import { Validators, FormGroup } from '@angular/forms';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';
import { GetBookRVM } from 'src/app/api-services/book-controller/get-book-rvm';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  componentTK = 'page.book.';
  mainTabTK = this.componentTK + 'tab.main.';
  contentTabTK = this.componentTK + 'tab.content.';
  commentsTabTK = this.componentTK + 'tab.comments.';

  bookId: number;
  model: GetBookRVM;

  newChapterFormTemplate: InputTemplate[] = [];
  newChapterFormErrors: any;

  get mainGridCols(): number {
    return this.breakpointService.level + 1;
  }

  get isTranslate(): boolean {

    if (this.model && this.model.originalTitle)
      return true;

    return false;
  }

  get mainProps(): { labelTK?: string, value?: string, valueTK?: string, link?: string | string[] }[] {

    if (!this.model)
      return [];

    return [
      {
        labelTK: 'author',
        value: this.model.authorName
      },
      {
        labelTK: 'book-state',
        valueTK: (this.model.bookStateTK ? 'book-state.' + this.model.bookStateTK : null)
      },
      {
        labelTK: 'team',
        value: this.model.teamName
      },
      {
        labelTK: 'language',
        valueTK: (this.model.languageTK ? 'language.' + this.model.languageTK : null)
      },
      {
        labelTK: 'original-language',
        valueTK: (this.model.originalLanguageTK ? 'language.' + this.model.originalLanguageTK : null)
      },
      {
        labelTK: 'user',
        value: this.model.user.userName
      }
    ];
  }

  constructor(
    private bookController: BookControllerService,
    private route: ActivatedRoute,
    private chapterController: ChapterControllerService,
    private bookmarksController: BookmarkControllerService,
    private pageService: PageService,
    private breakpointService: BreakpointService,
    private router: Router
  ) {
    this.pageService.loaded = false;
    this.newChapterFormTemplate = [
      {
        name: 'name',
        tk: 'chapter-name',
        validators: [Validators.required]
      }
    ];
  }

  ngOnInit() {
    this.bookId = +this.route.snapshot.paramMap.get('book');
    
    this.bookController.getBook(this.bookId)
      .subscribe(response => {
        this.model = response;
        this.pageService.loaded = true;
        this.pageService.setTitle(this.model.title);
      },
      response => {
        this.pageService.loaded = true;
        this.router.navigate(['/book-not-found']);
      });
  }

  changeBookmark(): void {

    if (this.model.bookmark)
      this.bookmarksController
        .removeBookmark(this.bookId)
        .subscribe(() => this.model.bookmark = false);
    else
      this.bookmarksController
        .addBookmark(this.bookId)
        .subscribe(() => this.model.bookmark = true);
  }

  addChapter(form: FormGroup) {

    if (form.valid) {

      this.chapterController
        .addChapter(form.value.name, this.bookId)
        .subscribe(chapterId => {

          this.router.navigate(['/book', this.bookId, chapterId]);
        }, response => {
          this.newChapterFormErrors = response;
        });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }
}
