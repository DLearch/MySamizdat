import { Component } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { HttpClient } from '@angular/common/http';
import { ConfigurationService } from 'src/app/services/configuration/configuration.service';
import { BookControllerService } from 'src/app/api-services/book-controller/book-controller.service';
import { ConfirmDialogService } from 'src/app/dialogs/confirm-dialog/confirm-dialog.service';
import { ConfirmDialogConfig } from 'src/app/dialogs/confirm-dialog/confirm-dialog-config';
import { FiltersDialogService } from 'src/app/dialogs/filters-dialog/filters-dialog.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent {

  constructor(
    private dialogService: DialogService,
    private http: HttpClient,
    private config: ConfigurationService,
    private bookController: BookControllerService,
    private confirmDialog: ConfirmDialogService,
    private filtersDialog: FiltersDialogService
  ) { }

  open() {

    this.confirmDialog.confirm().subscribe(result => console.log(result));

    //this.bookController.getBook(1).subscribe();
  }
}
