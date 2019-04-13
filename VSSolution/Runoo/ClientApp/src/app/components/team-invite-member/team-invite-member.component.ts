import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { ActivatedRoute } from '@angular/router';
import { TeamControllerService } from 'src/app/api/team/team-controller.service';
import { AppValidators } from 'src/app/app-validators';
import { Validators, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-team-invite-member',
  templateUrl: './team-invite-member.component.html',
  styleUrls: ['./team-invite-member.component.css']
})
export class TeamInviteMemberComponent implements OnInit {

  componentTK = 'component.team-invite-member.';

  formTemplate: InputTemplate[];
  formErrors: any;

  @Output() load = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  public constructor(
    private route: ActivatedRoute,
    private teamController: TeamControllerService
  ) { }

  ngOnInit() {

    this.formTemplate = [
      {
        name: 'userName',
        tk: 'username',
        validators: [Validators.required, AppValidators.userName]
      }
    ];
  }

  post(form: FormGroup) {

    if (form.valid) {

      this.load.emit(false);

      this.invite(form.value.userName).subscribe(succeeded => {

        this.load.emit(true);
        this.submit.emit(succeeded);
      });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  invite(userName: string): Observable<boolean> {
    console.log(this.route);
    return this.teamController
      .inviteMember(this.route.firstChild.firstChild.snapshot.paramMap.get('team'), userName)
      .pipe(
        map(() => this.inviteSuccess()),
        catchError(response => this.inviteError(response))
      );
  }

  inviteSuccess(): boolean {
    return true;
  }

  inviteError(errors): Observable<boolean> {
    this.formErrors = errors;
    return of(false);
  }

}
