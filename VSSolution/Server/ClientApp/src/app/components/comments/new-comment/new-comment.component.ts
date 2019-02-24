import { Component, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentEntityType } from './comment-entity-type';
import { NewCommentService } from './new-comment.service';
import { setErrors } from '../../input/set-errors';
import { Comment } from '../comment';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { CommentsService } from '../comments.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent {

  public mainForm: FormGroup;

  @Input() parentId: number = 0;

  constructor(
    formBuilder: FormBuilder,
    private newCommentService: NewCommentService,
    private userStorage: UserStorageService,
    private service: CommentsService
  ) {

    this.mainForm = formBuilder.group({

      'content': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      console.log(this.parentId);
      this.newCommentService
        .create(this.mainForm.value.content, this.service.entityId, this.service.entityType, this.parentId)
        .subscribe(
          comment => this.service.comments.push(comment),
          response => setErrors(response, this.mainForm)
        );
    }
  }
}
