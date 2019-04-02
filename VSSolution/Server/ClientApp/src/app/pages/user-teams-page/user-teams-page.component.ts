import { Component, OnInit } from '@angular/core';
import { PageService } from 'src/app/services/page/page.service';
import { TeamControllerService } from 'src/app/api-services/team-controller/team-controller.service';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { ActivatedRoute } from '@angular/router';
import { InputTemplate } from 'src/app/components/form/input-template';

@Component({
  selector: 'app-user-teams-page',
  templateUrl: './user-teams-page.component.html',
  styleUrls: ['./user-teams-page.component.css']
})
export class UserTeamsPageComponent implements OnInit {

  teams: any[] = null;
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private teamController: TeamControllerService
  ) {
    this.filtersTemplate = [
      {
        name: 'head',
        tk: 'team-head-filter',
        type: 'checkbox'
      }
    ];

    this.pageService.loaded = true;
  }

  ngOnInit() {

    this.update();
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: null }) {

    const userName: string = this.route.snapshot.paramMap.get('user');

    this.teams = null;

    this.teamController.getUserTeams(userName, event).subscribe(response => {

      this.teams = response.teams;

      this.event = {
        length: response.length,
        pageSize: event.pageSize,
        pageIndex: response.page,
        filters: event.filters
      };

    })
  }
}
