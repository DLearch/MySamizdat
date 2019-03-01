import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';
import { GetChapterRVM } from 'src/app/api-services/chapter-controller/get-chapter-rvm';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  model: GetChapterRVM;
  bookId: number;
  chapterId: number;
  chapterIndex: number;
  get isLastChapter(): boolean {
    return this.chapterIndex == this.model.book.chapters.length - 1;
  }
  get isFirstChapter(): boolean {
    return this.chapterIndex == 0;
  }

  constructor(
    private chapterController: ChapterControllerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.router.events.subscribe((e: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (e instanceof NavigationEnd) {
        this.updateModel();
      }
    });
    this.updateModel();
  }

  updateModel(): void {

    this.bookId = +this.route.snapshot.paramMap.get('book');
    this.chapterId = +this.route.snapshot.paramMap.get('chapter');

    this.chapterController
      .getChapter(this.chapterId)
      .subscribe(
        model => {
          this.model = model;
          this.chapterIndex = model.book.chapters.findIndex(b => b.id == this.chapterId);
          console.log(this.chapterIndex);
        }
        , error => console.log(error)
      );
  }
}
