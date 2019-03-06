import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { GetTeamRVM } from 'src/app/api-services/team-controller/get-team-rvm';
import { PageServiceService } from 'src/app/services/page-service/page-service.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  host: {
    'class': 'page'
  }
})
export class TeamComponent implements OnInit {

  componentTK = 'component.team.';
  model: GetTeamRVM;
  teamId: number;

  constructor(
    private route: ActivatedRoute,
    private pageService: PageServiceService,
    private teamController: TeamControllerService
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
  }

}
