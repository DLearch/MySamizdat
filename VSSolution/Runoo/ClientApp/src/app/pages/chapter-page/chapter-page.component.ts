import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetChapterApiResponse } from 'src/app/api/chapter/get-chapter-api-response';
import { Subscription, Observable } from 'rxjs';
import { ChapterControllerService } from 'src/app/api/chapter/chapter-controller.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';
import { map } from 'rxjs/operators';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.css']
})
export class ChapterPageComponent implements OnInit, OnDestroy {

  componentTK = 'page.chapter.';

  model: GetChapterApiResponse;

  bookId: number;
  chapterId: number;
  chapterIndex: number;
  sub: Subscription;

  get firstlevelAccess(): boolean {

    if (!this.model)
      return false;
    if (this.userStorage.teams
      && this.model
      && this.model.book.teamName
      && !!this.userStorage.teams.find(p => p.teamName.toUpperCase() == this.model.book.teamName.toUpperCase()))
      return true;

    return this.secondLevelAccess;
  }

  get secondLevelAccess(): boolean {

    return this.userStorage.userName
      && this.model.book.user.userName
      && (this.userStorage.userName.toUpperCase() == this.model.book.user.userName.toUpperCase());
  }

  get isLastChapter(): boolean {
    return this.chapterIndex == this.model.book.chapters.length - 1;
  }
  get isFirstChapter(): boolean {
    return this.chapterIndex == 0;
  }

  constructor(
    private chapterController: ChapterControllerService,
    private route: ActivatedRoute,
    private router: Router,
    private pageService: PageService,
    public userStorage: UserStorageService
  ) {
    this.startPageLoad();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params =>
      this.loadChapter(params['book'], params['chapter']).subscribe(() => this.finishPageLoad())
    );

    this.loadChapter(
      +this.route.snapshot.paramMap.get('book'),
      +this.route.snapshot.paramMap.get('chapter')
    );
  }

  loadChapter(bookId: number, chapterId: number): Observable<void> {

    this.bookId = bookId;
    this.chapterId = chapterId;

    return this.chapterController
      .get(this.chapterId)
      .pipe(
        map(response => {
          this.model = response;
          this.chapterIndex = response.book.chapters.findIndex(c => c.id == this.chapterId);
          this.pageService.setTitle(this.model.name);
        })
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  startPageLoad() {
    this.pageService.loaded = false;
  }

  finishPageLoad() {
    this.pageService.loaded = true;
  }
}
