import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetChapterRVM } from 'src/app/api-services/chapter-controller/get-chapter-rvm';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chapter-page',
  templateUrl: './chapter-page.component.html',
  styleUrls: ['./chapter-page.component.css']
})
export class ChapterPageComponent implements OnInit, OnDestroy {

  componentTK = 'page.chapter.';

  model: GetChapterRVM;

  bookId: number;
  chapterId: number;
  chapterIndex: number;
  sub: Subscription;

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
    private pageService: PageService
  ) {
    this.pageService.loaded = false;
  }

  ngOnInit() {
    this.sub = this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.updateModel();
      }
    });
    this.updateModel();
  }

  updateModel() {
    this.bookId = +this.route.snapshot.paramMap.get('book');
    this.chapterId = +this.route.snapshot.paramMap.get('chapter');

    this.chapterController
      .getChapter(this.chapterId)
      .subscribe(model => {
        this.model = model;
        this.chapterIndex = model.book.chapters.findIndex(c => c.id == this.chapterId);
        this.pageService.setTitle(this.model.name);
        this.pageService.loaded = true;
      }, response => {
        this.pageService.loaded = true;
        this.sub.unsubscribe();
        this.pageService.error = { error: '404', descriptionTK: 'error.chapter-not-found' };
      });
  }

  selectChapter(id: number) {

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
