import { Filter } from '../filters/filter';

export class CatalogPageUpdateEvent {
  pageSize: number;
  pageIndex: number;
  length: number;
  filters?: Filter[];
}
