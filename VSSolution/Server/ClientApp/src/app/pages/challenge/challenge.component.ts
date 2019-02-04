import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MyValidators } from 'src/app/MyValidators';

@Component({
  selector: 'app-challenge'
  , templateUrl: './challenge.component.html'
  , styleUrls: ['./challenge.component.css']
})
export class ChallengeComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
  ) {

    this.mainForm = formBuilder.group({
      
      'password': ['', [Validators.required, MyValidators.password]]
    });
  }

  public mainSubmit(): void {
    
  }

}
