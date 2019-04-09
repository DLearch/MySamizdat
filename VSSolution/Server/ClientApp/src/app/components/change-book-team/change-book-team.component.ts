import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InputTemplate } from '../form/input-template';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { Validators, FormGroup } from '@angular/forms';
import { AppValidators } from 'src/app/app-validators';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-change-book-team',
  templateUrl: './change-book-team.component.html',
  styleUrls: ['./change-book-team.component.css']
})
export class ChangeBookTeamComponent implements OnInit {

  componentTK = 'component.change-book-team.';

  formTemplate: InputTemplate[];
  formErrors: any;

  @Output() load = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<boolean>();

  public constructor(
    private route: ActivatedRoute,
    private bookController: BookControllerService
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

      this.give(form.value.teamName).subscribe(succeeded => {

        this.load.emit(true);
        this.submit.emit(succeeded);
      });
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }

  give(teamName: string): Observable<boolean> {
    console.log(this.route);
    return this.bookController
      .changeTeam(+this.route.firstChild.firstChild.snapshot.paramMap.get('book'), teamName)
      .pipe(
      map(() => this.giveSuccess()),
      catchError(response => this.giveError(response))
      );
  }

  giveSuccess(): boolean {
    return true;
  }

  giveError(errors): Observable<boolean> {
    this.formErrors = errors;
    return of(false);
  }
}
