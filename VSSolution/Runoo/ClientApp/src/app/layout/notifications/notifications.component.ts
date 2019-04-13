import { Component, OnInit } from '@angular/core';
import { GetNotificationsApiResponse } from 'src/app/api/notification/get-notifications-api-response';
import { NotificationControllerService } from 'src/app/api/notification/notification-controller.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  componentTK = 'layout.notifications.';

  model: GetNotificationsApiResponse[];

  constructor(
    private notificationController: NotificationControllerService
  ) {

    this.notificationController
      .getNotifications()
      .subscribe(model => this.model = model);
  }

  ngOnInit() {
  }

  remove(notification: GetNotificationsApiResponse) {

    this.model.splice(this.model.indexOf(notification), 1);
  }
}
