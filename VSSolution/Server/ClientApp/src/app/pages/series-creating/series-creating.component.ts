import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-series-creating',
  templateUrl: './series-creating.component.html',
  styleUrls: ['./series-creating.component.css']
})
export class SeriesCreatingComponent {

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
