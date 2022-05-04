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

}
