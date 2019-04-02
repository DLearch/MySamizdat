import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetTeamRVM } from './get-team-rvm';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { GetUserTeamsRVM } from './get-user-teams-rvm';

@Injectable()
export class TeamControllerService {

  readonly controller: string = 'team';

  constructor(
    private api: ApiService
  ) { }

  addTeam(name: string): Observable<string> {

    let model = {
      teamName: name
    };

    return this.api.post(model, this.controller, 'addteam');
  }

  getTeam(teamName: string): Observable<GetTeamRVM> {

    let model = {
      teamName: teamName
    };

    return this.api.post(model, this.controller, 'getteam');
  }

  inviteMember(teamName: string, userName: string): Observable<void> {

    let model = {
      userName: userName,
      teamName: teamName
    };

    return this.api.post(model, this.controller, 'invitemember');
  }

  respondInvitation(invitationId: number, accept: boolean): Observable<void> {

    let model = {
      invitationId: invitationId,
      accept: accept
    }

    return this.api.post(model, this.controller, 'respondinvitation');
  }

  removeMember(teamName: string, userName: string): Observable<void> {

    let model = {
      userName: userName,
      teamName: teamName
    };

    return this.api.post(model, this.controller, 'removemember');
  }

  getUserTeams(userName: string, event: CatalogPageUpdateEvent): Observable<GetUserTeamsRVM> {

    let model = {
      userName: userName,
      pageSize: event.pageSize,
      page: event.pageIndex,
      filters: event.filters
    };

    return this.api.post(model, this.controller, 'getuserteams');
  }
}
