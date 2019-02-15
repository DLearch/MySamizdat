import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';
import { ChapterService } from 'src/app/services/chapter/chapter.service';
import { CreateVM } from 'src/app/services/chapter/create-vm';

@Component({
  selector: 'app-chapter-creating',
  templateUrl: './chapter-creating.component.html',
  styleUrls: ['./chapter-creating.component.css']
})
export class ChapterCreatingComponent {

  public mainForm: FormGroup;
  bookId: number;
  constructor(
    private chapterService: ChapterService
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
      let model: CreateVM = {
        bookId: this.bookId,
        content: this.mainForm.value.content,
        name: this.mainForm.value.name
      };

      this.chapterService
        .create(model)
        .subscribe(
          chapterId => this.router.navigate([`book/${this.bookId}/${chapterId}`])
          , response => setErrors(response, this.mainForm)
        );
    }
  }

}
