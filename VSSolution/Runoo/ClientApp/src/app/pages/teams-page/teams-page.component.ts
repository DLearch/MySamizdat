import { Component, OnInit } from '@angular/core';
import { CatalogPageUpdateEvent } from 'src/app/components/catalog/catalog-page-update-event';
import { InputTemplate } from 'src/app/components/form/input-template';
import { PageService } from 'src/app/services/page/page.service';
import { ActivatedRoute, Params } from '@angular/router';
import { TeamControllerService } from 'src/app/api/team/team-controller.service';
import { Filter } from 'src/app/components/filters/filter';

@Component({
  selector: 'app-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.css']
})
export class TeamsPageComponent implements OnInit {

  teams: any[] = null;
  event: CatalogPageUpdateEvent = null;
  filtersTemplate: InputTemplate[];
  queryFilters: Filter[] = [];

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private teamController: TeamControllerService
  ) {
    //this.filtersTemplate = [
    //  {
    //    name: 'head',
    //    tk: 'team-head-filter',
    //    type: 'checkbox'
    //  }
    //];
    this.route.queryParams.subscribe(params => {
      this.updateFiltersTemplate(params);
    });

    this.pageService.loaded = true;
  }

  updateFiltersTemplate(params: Params = {}) {

    this.filtersTemplate = [
    ];
    for (let param in params) {
      this.queryFilters.push({ type: param, value: params[param] });
    }

    this.update();
  }
  ngOnInit() {
    
  }

  update(event: CatalogPageUpdateEvent = { pageSize: 10, length: 0, pageIndex: 0, filters: null }) {

    const userName: string = this.route.snapshot.paramMap.get('user');

    this.teams = null;

    if (!event.filters)
      event.filters = [];
    let filters = [...event.filters, ...this.queryFilters];

    this.teamController
      .getPage(event.pageIndex, event.pageSize, filters)
      .subscribe(response => {

      this.teams = response.teams;

      this.event = {
        length: response.length,
        pageSize: event.pageSize,
        pageIndex: response.page,
        filters: event.filters
      };

    }, response => {

      this.pageService.error = { descriptionTK: 'error.unknown' };
    })
  }
}
