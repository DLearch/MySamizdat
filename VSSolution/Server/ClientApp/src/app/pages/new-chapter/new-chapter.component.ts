import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';
import { ChapterControllerService } from 'src/app/api-services/chapter-controller/chapter-controller.service';

@Component({
  selector: 'app-new-chapter',
  templateUrl: './new-chapter.component.html',
  styleUrls: ['./new-chapter.component.css']
})
export class NewChapterComponent implements OnInit {
  
  public mainForm: FormGroup;
  bookId: number;

  constructor(
    private chapterController: ChapterControllerService
    , formBuilder: FormBuilder
    , private router: Router
    , private route: ActivatedRoute
  ) {

    this.mainForm = formBuilder.group({

      'name': ['', [Validators.required]],
      'content': ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.bookId = +this.route.snapshot.paramMap.get('book');
  }
  public mainSubmit(): void {

    if (this.mainForm.valid) {

      this.chapterController
        .addChapter(this.mainForm.value.name, this.mainForm.value.content, this.bookId)
        .subscribe(
          chapterId => this.router.navigate([`book/${this.bookId}/${chapterId}`])
          , response => setErrors(response, this.mainForm)
        );
    }
  }
}
