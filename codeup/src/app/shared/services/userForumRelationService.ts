import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {UserForumRelation} from "../entities/UserForumRelation";

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private httpclient: HttpClient) {
  }

  public addUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.post<UserForumRelation>(
      'http://localhost:8080/user_forum_relation/add/forum/' + forumId, null
    );
  }

  public getUserForumRelation(forumId: number): Observable<UserForumRelation> {
    return this.httpclient.get<UserForumRelation>(
      'http://localhost:8080/user_forum_relation/forum/' + forumId
    );
  }

  public deleteUserForumRelation(forumId: number): Observable<boolean> {
    return this.httpclient.delete<boolean>(
      'http://localhost:8080/user_forum_relation/delete/forum/' + forumId,
    );
  }

}
