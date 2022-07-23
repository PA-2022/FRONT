import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../entities/User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpclient: HttpClient) {}


  getUserById(id: number): Observable<User> {
    return this.httpclient.get<User>(
      'http://localhost:8080/users/' + id
    );
  }

  updateUserById(id: number, user: User): Observable<User> {
    return this.httpclient.put<User>(
      'http://localhost:8080/users/' + id, user
    )
  }

  changePasswordEmail() : Observable<boolean>{
    return this.httpclient.post<boolean>('http://localhost:8080/users/send-password-edit', {})
  }

  changePassword(password: String, token: String) : Observable<boolean>{
    return this.httpclient.post<boolean>('http://localhost:8080/users/change-password/' + password + "/token/" + token, {})
  }

  checkToken(token: any): Observable<boolean> {
    return this.httpclient.get<boolean>('http://localhost:8080/users/token/' + token);

  }

  lostPassword(email: String) {
    return this.httpclient.post<boolean>('http://localhost:8080/users/lost-password/' + email, {});

  }
}
