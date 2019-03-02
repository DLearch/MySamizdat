import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { Router } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent {

  public mainForm: FormGroup;

  constructor(
    private teamController: TeamControllerService
    , formBuilder: FormBuilder
    , private router: Router
  ) {

    this.mainForm = formBuilder.group({

      'name': ['', [Validators.required]]
    });

  }

  mainSubmit(): void {
    
    if (this.mainForm.valid) {

      this.teamController
        .addTeam(this.mainForm.value.name)
        .subscribe(
          id => this.router.navigate([`team/${id}`]),
          response => setErrors(response, this.mainForm)
        );
    }
  }
}
