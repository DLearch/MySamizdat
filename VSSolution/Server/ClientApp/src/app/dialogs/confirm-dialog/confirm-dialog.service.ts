import { Injectable } from '@angular/core';
import { DialogService } from 'src/app/layout/dialog/dialog.service';
import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { ConfirmDialogConfig } from './confirm-dialog-config';

@Injectable()
export class ConfirmDialogService {

  constructor(
    private dialog: DialogService
  ) { }

  confirm(config?: ConfirmDialogConfig): Observable<boolean> {

    return this.dialog.open(ConfirmDialogComponent, { ...new ConfirmDialogConfig(), ...config });
  }
}
