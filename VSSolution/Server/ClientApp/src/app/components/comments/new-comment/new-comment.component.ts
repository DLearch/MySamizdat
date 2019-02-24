import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewCommentService } from './new-comment.service';
import { setErrors } from '../../input/set-errors';
import { UserStorageService } from 'src/app/auth/user-storage.service';
import { CommentsService } from '../comments.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.component.html',
  styleUrls: ['./new-comment.component.css']
})
export class NewCommentComponent {

  public mainForm: FormGroup;

  @Input() isActive: boolean = true;
  @Input() isVisible: boolean = false;
  @Input() parentId: number = 0;
  @Output() isVisibleChange = new EventEmitter<boolean>();

  constructor(
    formBuilder: FormBuilder,
    private newCommentService: NewCommentService,
    private userStorage: UserStorageService,
    private service: CommentsService,
    private auth: AuthService
  ) {

    this.mainForm = formBuilder.group({

      'content': ['', [Validators.required]]
    });
  }

  cancel(): void {
    if (this.parentId) {
      this.isVisible = false;
      this.isVisibleChange.emit(false);
    }
    else
      this.isActive = false;
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
