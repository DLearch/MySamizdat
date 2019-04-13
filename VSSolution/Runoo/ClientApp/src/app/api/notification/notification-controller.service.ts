import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { Observable } from 'rxjs';
import { GetNotificationsApiResponse } from './get-notifications-api-response';

@Injectable()
export class NotificationControllerService {

  readonly controller: string = 'notification';

  constructor(
    private api: ApiService
  ) { }

  getNotifications(): Observable<GetNotificationsApiResponse[]> {

    return this.api.post(null, this.controller, 'get');
  }
}
