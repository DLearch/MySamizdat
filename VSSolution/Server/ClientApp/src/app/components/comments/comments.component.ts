import { Component, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  
  @Input() comments: Comment[];
  @Input() type: string;
  @Input() id: number;

  pushCommentFunc: Function = comment => this.pushComment(comment);

  pushComment(comment: Comment) {
    this.comments.push(comment)
  }
}
