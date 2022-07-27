import { Component, OnInit } from '@angular/core';
import {NotificationService} from "../shared/services/NotificationService";

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  notifications: any;
  activeNotifications: any;
  inactiveNotifications: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications() {
    this.notificationService.getNotifications().subscribe(response => {
      this.notifications = response;
      this.activeNotifications = this.notifications.filter((item: { read: boolean; }) => !item.read);
      this.inactiveNotifications = this.notifications.filter((item: { read: boolean; }) => item.read);
    })
  }

  readNotification(id: number) {
    this.notificationService.readNotification(id).subscribe(response => {
      console.log("la")
      this.loadNotifications();
    });
  }

  readAll() {
    this.notificationService.readAllNotifications().subscribe(response => {
      this.loadNotifications();
    });
  }
}
