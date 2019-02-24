import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/models/chapter';
import { CommentsService } from 'src/app/components/comments/comments.service';
import { ChapterService } from './chapter.service';

@Component({
  selector: 'app-chapter',
  templateUrl: './chapter.component.html',
  styleUrls: ['./chapter.component.css']
})
export class ChapterComponent implements OnInit {

  chapter: Chapter;

  constructor(
    private chapterService: ChapterService,
    private route: ActivatedRoute,
    private commentsService: CommentsService
  ) { }

  ngOnInit() {
    //const bookId: number = +this.route.snapshot.paramMap.get('book');
    const chapterId: number = +this.route.snapshot.paramMap.get('chapter');

    this.chapterService.get(chapterId).subscribe(
      chapter => {
        this.chapter = chapter;
        this.commentsService.comments = chapter.comments;
        this.commentsService.entityId = chapter.id;
        this.commentsService.entityType = 'chapter';
      }
      , error => console.log(error)
    );
  }

}
