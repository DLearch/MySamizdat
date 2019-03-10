import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { GetTeamRVM } from 'src/app/api-services/team-controller/get-team-rvm';
import { FormComponent } from 'src/app/components/form/form.component';
import { Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { PageService } from 'src/app/services/page/page.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  host: {
    'class': 'page'
  }
})
export class TeamComponent implements OnInit {

  @ViewChild('inviteForm') inviteFormComponent: FormComponent;
  inviteFormTemplate: any;
  inviteFormErrors: any;

  componentTK = 'component.team.';
  model: GetTeamRVM;
  teamId: number;


  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private snackBar: MatSnackBar,
    private teamController: TeamControllerService,
    private translate: TranslateService
  ) {
    this.pageService.setDefaultTitle();
  }

  ngOnInit() {
    this.teamId = +this.route.snapshot.paramMap.get('team');

    this.teamController
      .getTeam(this.teamId)
      .subscribe(model => {
        this.model = model;

        this.pageService.setTitle(model.name);
      });

    this.inviteFormTemplate = [
      {
        name: 'userName',
        tk: 'userName',
        type: 'text',
        validators: [Validators.required]
      }
    ];
  }

  invite() {

    if (this.inviteFormComponent.form.valid) {

      this.teamController
        .inviteMember(this.teamId, this.inviteFormComponent.form.value.userName)
        .subscribe(
          () => {

            this.snackBar.open(
              this.translate.instant(this.componentTK + 'invitation-sent'),
              this.translate.instant(this.componentTK + 'invitation-sent.ok')
            );
          },
          response => {
            this.inviteFormErrors = response;
          }
        );
    }
  }
}
