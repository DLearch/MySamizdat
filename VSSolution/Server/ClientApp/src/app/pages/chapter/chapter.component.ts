import { Component, OnInit } from '@angular/core';
import { ChapterService } from 'src/app/services/chapter/chapter.service';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/models/chapter';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  chapter: Chapter;

  constructor(
    private chapterService: ChapterService
    , private route: ActivatedRoute
  ) { }

  ngOnInit() {
    const bookId: number = +this.route.snapshot.paramMap.get('book');
    const chapterId: number = +this.route.snapshot.paramMap.get('chapter');

    this.chapterService.get(chapterId).subscribe(
      chapter => this.chapter = chapter
      , error => console.log(error)
    );
  }

}
