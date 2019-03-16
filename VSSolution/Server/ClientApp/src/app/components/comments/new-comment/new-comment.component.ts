import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommentEntityType } from 'src/app/api-services/comment-controller/comment-entity-type';
import { CommentControllerService } from 'src/app/api-services/comment-controller/comment-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { Validators, FormGroup } from '@angular/forms';
import { InputTemplate } from '../../form/input-template';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent {

  get user(): { userName: string, avatarPath: string } {
    return {
      userName: this.userStorage.userName,
      avatarPath: this.userStorage.avatarPath
    };
  }

  componentTK = 'component.new-comment.';

  @Input() entityId: number;
  @Input() entityType: CommentEntityType;
  @Input() parentId: number = 0;

  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Output() onCreate = new EventEmitter<any>();

  template: InputTemplate[];

  constructor(
    private commentController: CommentControllerService,
    private userStorage: UserStorageService
  ) {

    this.template = [
      {
        name: 'content',
        tk: 'comment',
        validators: [Validators.required]
      }
    ];
  }

  post(form: FormGroup) {
    
    if (form.valid) {

      this.commentController
        .addComment(form.value.content, this.entityId, this.entityType, this.parentId)
        .subscribe(response => {
          this.onCreate.emit({

            creationTime: response.creationTime,
            id: response.id,
            content: form.value.content,
            parentId: this.parentId,
            user: this.user
          });
        });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  cancel(): void {

    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
