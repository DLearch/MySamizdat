import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from 'src/app/models/team';
import { TeamService } from 'src/app/services/team/team.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  team: Team;

  constructor(
    private activatedRoute: ActivatedRoute
    , private teamService: TeamService
  ) { }

  ngOnInit() {
    const id: number = +this.activatedRoute.snapshot.paramMap.get('id');

    this.teamService.getTeam(id).subscribe(team => this.team = team);
  }

}
