import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { GetTeamsApiResponse } from './get-teams-api-response';
import { GetTeamApiResponse } from './get-team-api-response';

@Injectable()
export class TeamControllerService {

  readonly controller: string = 'team';

  constructor(
    private api: ApiService
  ) { }

  add(name: string): Observable<string> {

    let model = {
      teamName: name
    };

    return this.api.post(model, this.controller, 'add');
  }

  get(teamName: string): Observable<GetTeamApiResponse> {
    
    return this.api.post(null, this.controller, 'get', teamName);
  }

  getPage(page: number, pageSize: number, filters: { type: string, value?: any }[]): Observable<GetTeamsApiResponse> {

    let model = {
      page: page,
      pageSize: pageSize,
      filters: filters
    };

    return this.api.post(model, this.controller, 'getpage');
  }

  inviteMember(teamName: string, userName: string): Observable<void> {

    let model = {
      userName: userName
    };

    return this.api.post(model, this.controller, 'invitemember', teamName);
  }

  respondInvitation(teamName: string, accept: boolean): Observable<void> {

    let model = {
      accept: accept
    }

    return this.api.post(model, this.controller, 'respondinvitation', teamName);
  }

  delete(teamName: string): Observable<void> {

    return this.api.post(null, this.controller, 'delete', teamName);
  }

  deleteMember(teamName: string, userName: string): Observable<void> {

    let model = {
      userName: userName
    };

    return this.api.post(model, this.controller, 'deletemember', teamName);
  }
}
