import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, Observable} from 'rxjs';
import {User} from "../entities/User";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public authEvent = new BehaviorSubject<boolean>(false);
  public userEvent = new BehaviorSubject<boolean>(false);
  public loggedUser: User| undefined;
  constructor(private httpclient: HttpClient) {}

  login(value: object): Observable<any> {
    return this.httpclient.post<any>(
      'http://localhost:8080/login',
        value
    );
  }

  register(value: object): Observable<any> {
    const params = {

      email:"test@test.com",
      password:"testaaaa",
      username:"test",
      firstname:"test",
      lastname:"test"
    }

    return this.httpclient.post('http://localhost:8080/users/register', params);
  }

  emitAuthStatus(state: boolean): void {
    this.authEvent.next(state);
    if(state) {
      this.getCurrentUser();
    }
  }

  getCurrentUser(): Observable<User> {
    const user = this.httpclient.get<User>(
      'http://localhost:8080/users/current'
    );
    user.subscribe((us) => {
      if (us != null) {
        this.loggedUser = us;
        this.userEvent.next(true);
      }
    });
    return user;
  }

  logout(): void {
    this.httpclient
      .post<any>('http://localhost:8080/logout', '')
      .subscribe(() => {
        this.loggedUser = undefined;
        this.emitAuthStatus(false);
        this.userEvent.next(false);
        location.reload();
      });
  }

}
