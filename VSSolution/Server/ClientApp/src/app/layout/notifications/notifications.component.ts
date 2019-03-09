import { Component, OnInit } from '@angular/core';
import { NotificationControllerService } from 'src/app/api-services/notification-controller/notification-controller.service';
import { GetNotificationsRVM } from 'src/app/api-services/notification-controller/get-notifications-rvm';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  model: GetNotificationsRVM[];

  constructor(
    private notificationController: NotificationControllerService
  ) { }

  ngOnInit() {

    this.notificationController
      .getNotifications()
      .subscribe(model => this.model = model);
  }

}
