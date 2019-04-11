import { Component, OnInit, Inject } from '@angular/core';
import { dialogDataToken } from 'src/app/layout/dialog/dialog-data-token';
import { InputTemplate } from 'src/app/components/form/input-template';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { Filter } from 'src/app/components/filters/filter';

@Component({
  selector: 'app-filters-dialog',
  templateUrl: './filters-dialog.component.html',
  styleUrls: ['./filters-dialog.component.css']
})
export class FiltersDialogComponent implements OnInit {

  constructor(
    @Inject(dialogDataToken) public template: InputTemplate[],
    private dialog: DialogService
  ) { }

  ngOnInit() {
  }

  onApply(filters: Filter[]) {
    this.dialog.close(filters);
  }
}
