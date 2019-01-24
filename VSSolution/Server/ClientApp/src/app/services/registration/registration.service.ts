import { Injectable } from '@angular/core';
import { UserStorageService } from '../user-storage/user-storage.service';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private readonly registerController: string = 'registration';

  constructor(
    private api: ApiService
    , userStorage: UserStorageService
  ) {
    userStorage.token = null;
  }

  public register(data: any): Observable<any> {

    return this.api
      .post(data, this.registerController);
  }
}
