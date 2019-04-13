import { Component, OnInit } from '@angular/core';
import { ErrorPageData } from 'src/app/services/page/error-page-data';
import { GetTeamApiResponse } from 'src/app/api/team/get-team-api-response';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';
import { TeamControllerService } from 'src/app/api/team/team-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  readonly componentTK = 'page.team.';
  readonly notFoundError: ErrorPageData = { error: '404', descriptionTK: 'error.team-not-found' };

  get currentMember() {
    return this.model.members.find(m => m.userName == this.userStorage.userName);
  }

  teamName: string;
  model: GetTeamApiResponse;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private teamController: TeamControllerService,
    private userStorage: UserStorageService
  ) {
    this.startPageLoad();
  }

  ngOnInit() {

    this.route.params.subscribe(params =>
      this.loadModel(params['team'])
        .subscribe(() => this.finishPageLoad())
    );
  }

  loadModel(teamName: string): Observable<boolean> {

    this.teamName = teamName;

    return this.teamController
      .get(teamName)
      .pipe(
        map(response => this.modelLoadSuccess(response)),
        catchError(response => this.modelLoadError(response))
      );
  }

  modelLoadSuccess(response): boolean {

    this.model = response;

    this.setTitle();

    return true;
  }

  modelLoadError(error): Observable<boolean> {

    this.pageService.error = this.notFoundError;

    return of(false);
  }

  startPageLoad() {
    this.pageService.loaded = false;
  }

  finishPageLoad() {
    this.pageService.loaded = true;
  }

  setTitle() {

    if (this.teamName)
      this.pageService.setTitle(this.teamName);
    else
      this.pageService.setDefaultTitle();
  }

  removeMember(member) {

    this.teamController
      .deleteMember(this.teamName, member.userName)
      .subscribe(
        () => {

          const index = this.model.members.indexOf(member);
          this.model.members.splice(index, 1)
        }
      );
  }
}
