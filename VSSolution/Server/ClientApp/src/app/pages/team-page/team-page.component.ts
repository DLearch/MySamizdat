import { Component, OnInit } from '@angular/core';
import { ErrorPageData } from '../error-page/error-page-data';
import { GetTeamRVM } from 'src/app/api-services/team-controller/get-team-rvm';
import { ActivatedRoute } from '@angular/router';
import { PageService } from 'src/app/services/page/page.service';
import { Observable, of } from 'rxjs';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-team-page',
  templateUrl: './team-page.component.html',
  styleUrls: ['./team-page.component.css']
})
export class TeamPageComponent implements OnInit {

  readonly componentTK = 'page.team.';
  readonly notFoundError: ErrorPageData = { error: '404', descriptionTK: 'error.team-not-found' };

  teamName: string;
  model: GetTeamRVM;
  constructor(
    private route: ActivatedRoute,
    private pageService: PageService,
    private teamController: TeamControllerService
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
      .getTeam(teamName)
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
}
