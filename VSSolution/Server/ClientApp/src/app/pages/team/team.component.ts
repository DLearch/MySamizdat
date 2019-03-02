import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { GetTeamRVM } from 'src/app/api-services/team-controller/get-team-rvm';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  model: GetTeamRVM;
  teamId: number;

  constructor(
    private route: ActivatedRoute,
    private teamController: TeamControllerService
  ) { }

  ngOnInit() {
    this.teamId = +this.route.snapshot.paramMap.get('team');

    this.teamController
      .getTeam(this.teamId)
      .subscribe(model => this.model = model);
  }

}
