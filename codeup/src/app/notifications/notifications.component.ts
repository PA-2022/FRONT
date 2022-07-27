import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../shared/services/NotificationService";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotifications().subscribe(response => {
      this.notifications = response;
    })
  }

  readNotification() {

  }
}
