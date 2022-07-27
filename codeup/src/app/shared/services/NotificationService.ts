import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL= environment.API_URL;
  public callEvent = new BehaviorSubject<number>(0);
  private counter = 0;
  constructor(private httpclient: HttpClient) {
    this.emitCallStatus(0);
  }

  getNotificationsCount(): Observable<number> {
    return this.httpclient.get<number>(this.API_URL + "notifications/count");
  }

  getNotifications(): Observable<any> {
    this.emitCallStatus(this.counter++);
    return this.httpclient.get<any>(this.API_URL + "notifications/all");
  }

  readAllNotifications() {
    return this.httpclient.post<any>(this.API_URL + "notifications/read-all", {});
  }
  readNotification(id:number) {
    return this.httpclient.post<any>(this.API_URL + "notifications/read/" + id, {});
  }

  emitCallStatus(state: number): void {
    this.callEvent.next(state);
  }
}
