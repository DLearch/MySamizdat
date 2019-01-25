import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamService } from 'src/app/services/team/team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent {

  public mainForm: FormGroup;

  public constructor(
    formBuilder: FormBuilder
    , private teamService: TeamService
    , private router: Router
  ) {

    this.mainForm = formBuilder.group({
      
      'name': ['', [Validators.required]]
    });
  }

  public mainSubmit(): void {

    //if (this.mainForm.valid)
    this.teamService
      .createTeam(this.mainForm.value)
      .subscribe(teamId => this.router.navigate([`/team/{teamId}`]));
  }
  
}
