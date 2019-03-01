import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { setErrors } from '../../input/set-errors';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { CommentControllerService } from 'src/app/api-services/comment-controller/comment-controller.service';
import { CommentEntityType } from 'src/app/api-services/comment-controller/comment-entity-type';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent {

  public mainForm: FormGroup;

  @Input() comment: any = null;
  @Output() commentChange = new EventEmitter<any>();

  @Input() isActive: boolean = true;
  @Input() isVisible: boolean = false;
  @Input() comments: any[];
  @Input() entityType: CommentEntityType;
  @Input() entityId: number;
  @Input() parentId: number = 0;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(
    formBuilder: FormBuilder,
    private userStorage: UserStorageService,
    private auth: AuthService,
    private commentController: CommentControllerService
  ) {

    this.mainForm = formBuilder.group({

      'content': ['', [Validators.required]]
    });
  }

  cancel(): void {
    
    this.isVisible = false;
    this.isVisibleChange.emit(false);
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {
      
    }
  }
}
