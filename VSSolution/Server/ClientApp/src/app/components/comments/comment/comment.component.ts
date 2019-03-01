import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {

  newCommentVisible: boolean = false;
  answersVisible: boolean = false;
  @Input() comment: any = null;

  constructor(
    private auth: AuthService
  ) { }
  answer(): void {
    this.newCommentVisible = true;
  }

  get comments(): any[] {
    return null;
    //return this.service.comments
    //  .filter(comment => comment.parentId == this.comment.id);
  }
}
