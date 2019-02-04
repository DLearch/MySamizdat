import { Component} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-book-creating',
  templateUrl: './book-creating.component.html',
  styleUrls: ['./book-creating.component.css']
})
export class BookCreatingComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
  ) {

    this.mainForm = formBuilder.group({

      'title': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {
    
  }
}
