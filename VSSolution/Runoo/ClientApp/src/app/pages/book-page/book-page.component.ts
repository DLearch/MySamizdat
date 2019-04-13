import { Component, OnInit } from '@angular/core';
import { InputTemplate } from 'src/app/components/form/input-template';
import { GetBookApiResponse } from 'src/app/api/book/get-book-api-response';
import { BookControllerService } from 'src/app/api/book/book-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ChapterControllerService } from 'src/app/api/chapter/chapter-controller.service';
import { PageService } from 'src/app/services/page/page.service';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import { Validators, FormGroup } from '@angular/forms';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {

  componentTK = 'page.book.';

  bookId: number;
  model: GetBookApiResponse;

  newChapterFormTemplate: InputTemplate[] = [];
  newChapterFormErrors: any;

  get firstlevelAccess(): boolean {

    if (this.userStorage.teams && this.model && this.model.teamName && !!this.userStorage.teams.find(p => p.teamName.toUpperCase() == this.model.teamName.toUpperCase()))
      return true;

    return this.secondLevelAccess;
  }

  get secondLevelAccess(): boolean {

    return this.userStorage.userName && this.model.user.userName&& (this.userStorage.userName.toUpperCase() == this.model.user.userName.toUpperCase());
  }
  get mainGridCols(): number {

    if (this.breakpointService.level == 0)
      return 1;

    if (this.breakpointService.level == 1)
      return 2;

    if (this.breakpointService.level == 2)
      return 3;
    return 4;
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
      },
      {
        labelTK: 'description',
        value: this.model.description
      },
      {
        labelTK: 'book-state-comment',
        value: this.model.bookStateComment
      }
    ];
  }

  constructor(
    private bookController: BookControllerService,
    private route: ActivatedRoute,
    private chapterController: ChapterControllerService,
    private pageService: PageService,
    private breakpointService: BreakpointService,
    private router: Router,
    public userStorage: UserStorageService
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

    this.bookController.get(this.bookId)
      .subscribe(response => {
        this.model = response;
        this.pageService.loaded = true;
        this.pageService.setTitle(this.model.title);
      },
        response => {
          this.pageService.loaded = true;
          this.pageService.error = { error: '404', descriptionTK: 'error.book-not-found' };
        });
  }

  changeBookmark(): void {
    this.bookController
      .bookmark(this.bookId, !this.model.bookmark)
      .subscribe(() => this.model.bookmark = !this.model.bookmark);
  }

  addChapter(form: FormGroup) {

    if (form.valid) {

      this.chapterController
        .add(form.value.name, this.bookId)
        .subscribe(chapterId => {

          this.router.navigate(['/book', this.bookId, chapterId]);
        }, response => {
          this.newChapterFormErrors = response;
        });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  changeTeam() {

  }
}
