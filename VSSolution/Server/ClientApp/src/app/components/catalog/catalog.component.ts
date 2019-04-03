import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Filter } from '../filters/filter';
import { PageEvent } from '@angular/material';
import { CatalogPageUpdateEvent } from './catalog-page-update-event';
import { InputTemplate } from '../form/input-template';

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

  constructor() { }

  ngOnInit() {
    
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
