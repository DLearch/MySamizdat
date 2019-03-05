import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { CommentControllerService } from 'src/app/api-services/comment-controller/comment-controller.service';
import { CommentEntityType } from 'src/app/api-services/comment-controller/comment-entity-type';
import { FormComponent } from '../../form/form.component';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent implements OnInit {

  get author(): { userName: string, avatarPath: string } {
    return {
      userName: this.userStorage.userName,
      avatarPath: this.userStorage.avatarPath
    };
  }

  @ViewChild('form') formComponent: FormComponent;

  @Input() entityId: number;
  @Input() entityType: CommentEntityType;
  @Input() parentId: number = 0;
  
  @Input() isVisible: boolean = false;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  @Output() onCreate = new EventEmitter<any>();
  template: any;

  constructor(
    private commentController: CommentControllerService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit(): void {

    this.template = [
      {
        name: 'content',
        tk: 'comment',
        type: 'text',
        validators: [Validators.required]
      }
    ];
  }

  submit(): void {

    if (this.formComponent.form.valid) {

      this.commentController
        .addComment(this.formComponent.form.value.content, this.entityId, this.entityType, this.parentId)
        .subscribe(
        response => {
          this.onCreate.emit({
            creationTime: response.creationTime,
            id: response.id,
            content: this.formComponent.form.value.content,
            parentId: this.parentId,
            //parent: {
            //  author: {
            //    userName: this.userStorage.userName
            //  }
            //},
            author: this.author
          });
        },
        response => {

          this.formComponent.errors = response;
        });
    }
  }

  cancel(): void {

    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }
}
