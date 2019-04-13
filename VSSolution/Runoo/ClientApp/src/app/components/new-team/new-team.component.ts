import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { Router } from '@angular/router';
import { TeamControllerService } from 'src/app/api/team/team-controller.service';
import { AppValidators } from 'src/app/app-validators';
import { Validators, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
      .add(teamName)
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
