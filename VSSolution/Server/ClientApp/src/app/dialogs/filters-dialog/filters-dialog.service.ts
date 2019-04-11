import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { InputTemplate } from 'src/app/components/form/input-template';
import { FiltersDialogComponent } from './filters-dialog.component';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/components/filters/filter';

@Injectable()
export class FiltersDialogService {

  constructor(
    private dialog: DialogService
  ) { }

  getFilters(formTemplate: InputTemplate[]): Observable<Filter[]> {

    return this.dialog.open(FiltersDialogComponent, formTemplate);
  }
}
