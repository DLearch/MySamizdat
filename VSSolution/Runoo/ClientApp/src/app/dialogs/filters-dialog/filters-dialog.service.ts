import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/dialog/dialog.service';
import { InputTemplate } from 'src/app/components/form/input-template';
import { Observable } from 'rxjs';
import { Filter } from 'src/app/components/filters/filter';
import { FiltersDialogComponent } from './filters-dialog.component';

@Injectable()
export class FiltersDialogService {

  constructor(
    private dialog: DialogService
  ) { }

  getFilters(formTemplate: InputTemplate[]): Observable<Filter[]> {

    return this.dialog.open(FiltersDialogComponent, formTemplate);
  }
}
