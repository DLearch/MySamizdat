import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetTeamRVM } from './get-team-rvm';

@Injectable()
export class TeamControllerService {

  readonly controller: string = 'team';

  constructor(
    private api: ApiService
  ) { }

  addTeam(name: string): Observable<number> {

    let model = {
      name: name
    };

    return this.api.post(model, this.controller, 'add');
  }

  getTeam(teamId: number): Observable<GetTeamRVM> {

    let model = {
      teamId: teamId
    };

    return this.api.post(model, this.controller, 'get');
  }
}