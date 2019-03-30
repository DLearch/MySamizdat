import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { Validators, FormGroup } from '@angular/forms';
import { AppValidators } from 'src/app/app-validators';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-team',
  templateUrl: './new-team.component.html',
  styleUrls: ['./new-team.component.css']
})
export class NewTeamComponent implements OnInit {

  componentTK = 'component.new-team.';

  formTemplate: InputTemplate[];
  formErrors: any;

  @Output() load = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  public constructor(
    private teamController: TeamControllerService,
    private router: Router
  ) { }

  ngOnInit() {

    this.formTemplate = [
      {
        name: 'teamName',
        tk: 'team-name',
        validators: [Validators.required, AppValidators.userName]
      }
    ];
  }

  post(form: FormGroup) {

    if (form.valid) {

      this.load.emit(false);

      this.createTeam(form.value.teamName).subscribe(succeeded => {

        this.load.emit(true);
        this.submit.emit(succeeded);
      });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  createTeam(teamName: string): Observable<boolean> {

    return this.teamController
      .addTeam(teamName)
      .pipe(
        map(() => this.createTeamSuccess(teamName)),
        catchError(response => this.createTeamError(response))
      );
  }

  createTeamSuccess(teamName: string): boolean {
    this.router.navigate(['/team', teamName]);
    return true;
  }

  createTeamError(errors): Observable<boolean> {
    this.formErrors = errors;
    return of(false);
  }
}
