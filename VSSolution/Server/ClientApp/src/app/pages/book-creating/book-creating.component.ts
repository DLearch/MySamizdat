import { Component, ChangeDetectorRef } from '@angular/core';
import { BookService } from 'src/app/services/book/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { setErrors } from 'src/app/components/input/set-errors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-creating',
  templateUrl: './book-creating.component.html',
  styleUrls: ['./book-creating.component.css'],
  host: {
    'class': 'component content'
  }
})
export class BookCreatingComponent {

  public mainForm: FormGroup;
  image: any;
  constructor(
    private bookService: BookService
    , formBuilder: FormBuilder
    , private router: Router
    , private cd: ChangeDetectorRef
  ) {

    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]],
      'mainImage': ['', []]
    });
  }

  public mainSubmit(event): void {
    console.log(event);
    if (this.mainForm.valid)
      this.bookService
        .create(this.mainForm.value)
        .subscribe(
          bookId => this.router.navigate([`book/${bookId}`])
          , response => setErrors(response, this.mainForm)
        );
  }

  onFileChange(files: File[]) {
    if (files && files.length) {
      const [file] = files;
      this.mainForm.patchValue({
        mainImage: file
      });
    }
    //const reader = new FileReader();

    //if (files && files.length) {
    //  const [file] = files;
    //  reader.readAsDataURL(file);

    //  reader.onload = () => {
    //    this.mainForm.patchValue({
    //      mainImage: reader.result
    //    });

    //    // need to run CD since file load runs outside of zone
    //    this.cd.markForCheck();
    //  };
    //}
    //const reader = new FileReader();

    //if (event.target.files && event.target.files.length) {
    //  const [file] = event.target.files;
    //  reader.readAsDataURL(file);

    //  reader.onload = () => {
    //    this.mainForm.patchValue({
    //      mainImage: reader.result
    //    });
        
    //    // need to run CD since file load runs outside of zone
    //    this.cd.markForCheck();
    //  };
    //}

  }
}
