import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {User} from "../entities/User";
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private API_URL= environment.API_URL;

  constructor(private httpclient: HttpClient) {
  }

  getNotificationsCount(): Observable<number> {
    return this.httpclient.get<number>(this.API_URL + "notifications/count");
  }

  getNotifications(): Observable<any> {
    return this.httpclient.get<any>(this.API_URL + "notifications/all");
  }


}
