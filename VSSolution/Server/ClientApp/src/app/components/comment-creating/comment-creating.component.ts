import { Component, Input, EventEmitter } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommentService } from 'src/app/services/comment/comment.service';
import { setErrors } from '../input/set-errors';

@Component({
  selector: 'app-comment-creating',
  templateUrl: './comment-creating.component.html',
  styleUrls: ['./comment-creating.component.css']
})
export class CommentCreatingComponent {

  public mainForm: FormGroup;

  @Input() parentId: number;
  @Input() type: string;
  @Input() id: number;
  @Input() callback: Function;

  constructor(
    formBuilder: FormBuilder
    , private commentService: CommentService
  ) {

    this.mainForm = formBuilder.group({

      'content': ['', [Validators.required]]
    });
  }


  public mainSubmit(): void {

    if (this.mainForm.valid) {
      

      if (this.type == 'book')
        this.commentService.commentBook(this.mainForm.value.content, this.id)
          .subscribe(
          comment => this.handleResponse(comment)
            , response => setErrors(response, this.mainForm)
          );
      else if (this.type == 'chapter')
        this.commentService.commentChapter(this.mainForm.value.content, this.id)
          .subscribe(
            comment => this.handleResponse(comment)
            , response => setErrors(response, this.mainForm)
          );
      else
        throw new Error('Wrong comment type');
      
    }
  }

  handleResponse(comment: Comment): void {

    this.callback(comment);
    this.mainForm.reset();
  }

}
