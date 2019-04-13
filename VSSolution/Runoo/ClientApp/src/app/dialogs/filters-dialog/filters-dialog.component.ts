import { Component, OnInit, Inject } from '@angular/core';
import { Filter } from 'src/app/components/filters/filter';
import { DialogService } from 'src/app/dialog/dialog.service';
import { dialogDataToken } from 'src/app/dialog/dialog-data-token';
import { InputTemplate } from 'src/app/components/form/input-template';

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
