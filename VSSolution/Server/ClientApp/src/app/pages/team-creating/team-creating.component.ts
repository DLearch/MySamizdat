import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-team-creating',
  templateUrl: './team-creating.component.html',
  styleUrls: ['./team-creating.component.css']
})
export class TeamCreatingComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
  ) {

    this.mainForm = formBuilder.group({

      'teamName': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {

  }

}
