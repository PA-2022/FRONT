import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {UserForumRelation} from "../entities/UserForumRelation";
import {Post} from "../entities/Post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpclient: HttpClient) {
  }

  public addPost(post: Post): Observable<Post> {
    return this.httpclient.post<Post>(
      'http://localhost:8080/posts/add' , post
    );
  }

  public getPostById(id: number): Observable<Post> {
    console.log(id)
    return this.httpclient.get<Post>('http://localhost:8080/posts/' + id);
  }
}
