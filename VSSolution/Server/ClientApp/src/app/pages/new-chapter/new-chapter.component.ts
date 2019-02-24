import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NewChapterService } from './new-chapter.service';
import { Router, ActivatedRoute } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent {

  public mainForm: FormGroup;
  bookId: number;

  constructor(
    private newChapterService: NewChapterService
    , formBuilder: FormBuilder
    , private router: Router
    , private route: ActivatedRoute
  ) {

    this.mainForm = formBuilder.group({

      'name': ['', [Validators.required]],
      'content': ['', [Validators.required]]
    });

    this.bookId = +this.route.snapshot.paramMap.get('book');
  }

  public mainSubmit(): void {

    if (this.mainForm.valid) {

      this.newChapterService
        .create({
          bookId: this.bookId,
          content: this.mainForm.value.content,
          name: this.mainForm.value.name
        })
        .subscribe(
          chapterId => this.router.navigate([`book/${this.bookId}/${chapterId}`])
          , response => setErrors(response, this.mainForm)
        );
    }
  }
}
