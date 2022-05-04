import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {UserForumRelation} from "../entities/UserForumRelation";

@Injectable({
  providedIn: 'root'
})
export class UserForumRelationService {

  constructor(private httpclient: HttpClient) {
  }

  public addUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.post<UserForumRelation>(
      'http://localhost:8080/user-forum-relation/add/forum/' + forumId, {}
    );
  }

  public getUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.get<UserForumRelation>(
      'http://localhost:8080/user-forum-relation/forum/' + forumId
    );
  }

  public deleteUserForumRelation(forumId: number): Observable<boolean> {
    return this.httpclient.delete<boolean>(
      'http://localhost:8080/user-forum-relation/delete/forum/' + forumId, {}
    );
  }

  getAllLoggedUserRelations(): Observable<Array<UserForumRelation>>{
    return this.httpclient.get<Array<UserForumRelation>>(
      'http://localhost:8080/user-forum-relation/all-by-logged-user'
    );
  }
}
