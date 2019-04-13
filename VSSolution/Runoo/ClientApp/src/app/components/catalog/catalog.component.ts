import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Filter } from '../filters/filter';
import { CatalogPageUpdateEvent } from './catalog-page-update-event';
import { InputTemplate } from '../form/input-template';
import { BreakpointService } from 'src/app/services/breakpoint/breakpoint.service';
import { PageEvent } from '@angular/material';
import { FiltersDialogService } from 'src/app/dialogs/filters-dialog/filters-dialog.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent implements OnInit {

  componentTK = 'component.catalog.';

  updated: boolean = false;
  searchValue: string = null;
  filters: Filter[] = [];

  filtersOpened: boolean = false;

  private _event: CatalogPageUpdateEvent = null;
  @Input() set event(value: CatalogPageUpdateEvent) {
    this._event = value;
    this.updated = value != null;
  }
  get event(): CatalogPageUpdateEvent {
    return this._event;
  }

  @Input() addLink: string | string[] = null;
  @Input() headerLabel: string = null;
  @Input() filtersTemplate: InputTemplate[];

  @Output() onUpdate = new EventEmitter<CatalogPageUpdateEvent>();

  constructor(
    private breakpoint: BreakpointService,
    private filtersDialog: FiltersDialogService
  ) { }

  ngOnInit() {
    
  }

  filtersClick() {

    if (this.breakpoint.level < 3) {
      this.filtersOpened = false;
      this.filtersDialog
        .getFilters(this.filtersTemplate)
        .subscribe(filters => this.applyFilters(filters));
    }
    else {
      this.filtersOpened = !this.filtersOpened;
    }
  }
  
  update(event: PageEvent = { pageSize: this.event.pageSize, pageIndex: this.event.pageIndex, length: this.event.length }) {

    this.updated = false;
    this.onUpdate.emit({
      pageIndex: event.pageIndex,
      pageSize: event.pageSize,
      length: event.length,
      filters: this.getAllFilters()
    });
  }

  search(value: string) {

    this.searchValue = value;

    this.update();
  }

  applyFilters(filters: Filter[]) {

    if (filters)
      this.filters = filters;
    else
      this.filters = [];

    this.update();
  }

  getAllFilters(): Filter[] {

    let filters: Filter[] = [];

    if (this.searchValue)
      filters.push({ type: 'search', value: this.searchValue });

    for (let element of this.filters)
      filters.push(element);

    return filters;
  }
}
