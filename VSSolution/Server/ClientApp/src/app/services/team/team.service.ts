import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Observable } from 'rxjs';
import { Team } from 'src/app/models/team';
import { map } from 'rxjs/operators';
import { CreateVM } from './create.vm';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private readonly teamController: string = 'team';
  private readonly getAction: string = 'get';
  private readonly createAction: string = 'create';
  private readonly sendInvitationAction: string = 'sendinvitation';
  private readonly removeMemberAction: string = 'removeMember';

  constructor(
    private api: ApiService
  ) { }

  public getTeam(teamId: number): Observable<Team> {

    let model = {
      teamId: teamId
    };
    
    return this.api
      .post(model, this.teamController, this.getAction)
      .pipe(
        map(response => {
          return response.team as Team;
        })
      );
  }

  public createTeam(model: CreateVM): Observable<number> {

    return this.api
      .post(model, this.teamController, this.createAction)
      .pipe(
        map(response => {
          return response.team.id as number;
        })
      );
  }

  public sendInvitation(userId: number, teamId: number): Observable<any> {

    let model = {
      userId: userId
      , teamId: teamId
    };

    return this.api
      .post(model, this.teamController, this.sendInvitationAction);
  }

  public removeMember(userId: number, teamId: number): Observable<any> {

    let model = {
      userId: userId
      , teamId: teamId
    };

    return this.api
      .post(model, this.teamController, this.removeMemberAction);
  }
}
