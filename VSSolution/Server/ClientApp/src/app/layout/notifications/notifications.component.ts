import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NotificationControllerService } from 'src/app/api-services/notification-controller/notification-controller.service';
import { GetNotificationsRVM } from 'src/app/api-services/notification-controller/get-notifications-rvm';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  componentTK = 'layout.notifications.';

  model: GetNotificationsRVM[];
  
  constructor(
    private notificationController: NotificationControllerService
  ) {

    this.notificationController
      .getNotifications()
      .subscribe(model => this.model = model);
  }

  ngOnInit() {
  }

  remove(notification: GetNotificationsRVM) {
    
    this.model.splice(this.model.indexOf(notification), 1)
  }
}
