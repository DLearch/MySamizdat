import { Component } from '@angular/core';
import { CommentsService } from './comments.service';
import { Comment } from './comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {

  constructor(
    private service: CommentsService
  ) { }

  get comments(): Comment[] {

    return this.service.comments
      .filter(comment => !comment.parentId);
  }

  pluralComments: any = {
    '=0': 'comments-count.none',
    '=1': 'comments-count.singular.',
    'other': 'comments-count.plural'
  }
}
