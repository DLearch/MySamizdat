import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { Observable } from 'rxjs';
import { GetNotificationsRVM } from './get-notifications-rvm';

@Injectable({
  providedIn: 'root'
})
export class NotificationControllerService {

  readonly controller: string = 'notification';

  constructor(
    private api: ApiService
  ) { }

  getNotifications(): Observable<GetNotificationsRVM[]> {
    
    return this.api.post(null, this.controller, 'get');
  }
}
