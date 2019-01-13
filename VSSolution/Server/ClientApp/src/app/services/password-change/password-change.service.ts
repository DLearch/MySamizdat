import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserStorageService } from '../user-storage/user-storage.service';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordChangeService {

  private readonly changeController: string = 'passwordchange';

  constructor(
    private api: ApiService
    , private userStorage: UserStorageService
  ) { }

  public change(data: any): Observable<any> {

    data.name = this.userStorage.name;

    return this.api
      .post(data, this.changeController);
  }
}
