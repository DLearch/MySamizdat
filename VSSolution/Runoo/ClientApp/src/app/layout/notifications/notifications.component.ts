import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetNotificationsApiResponse } from 'src/app/api/notification/get-notifications-api-response';
import { NotificationControllerService } from 'src/app/api/notification/notification-controller.service';
import { UserStorageService } from 'src/app/services/user-storage/user-storage.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  componentTK = 'layout.notifications.';

  sub: Subscription = null; 
  model: GetNotificationsApiResponse[];

  constructor(
    private notificationController: NotificationControllerService,
    private userStorage: UserStorageService
  ) { }

  ngOnInit() {

    this.sub = this.userStorage.authChanged.subscribe(auth => {

      if (auth) {
        this.notificationController
          .getNotifications()
          .subscribe(model => this.model = model);
      }
      else {
        this.model = null;
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  remove(notification: GetNotificationsApiResponse) {

    this.model.splice(this.model.indexOf(notification), 1);
  }
}
