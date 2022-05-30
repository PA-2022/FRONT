import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Post} from "../entities/Post";
import {Comment} from "../entities/Comment";
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
    return this.httpclient.get<Post>('http://localhost:8080/posts/' + id);
  }

  public getPostComments(id: number): Observable<any> {
    return this.httpclient.get<any>('http://localhost:8080/comments/comment/post/' + id)
  }

  sendComment(comment: Comment) {
    return this.httpclient.post<Comment>(
      'http://localhost:8080/comments' , comment
    );
  }

  deleteComment(commentId : number) {
    return this.httpclient.delete<boolean>(
      'http://localhost:8080/comments/comment/' + commentId
    );
  }

  editComment(comment: any) {
    return this.httpclient.put<Comment>(
      'http://localhost:8080/comments' , comment
    );
  }

  getCommentCount(postId: number) {
    return this.httpclient.get<number>(
      'http://localhost:8080/comments/comment/post/' + postId + '/count'
    )
  }
}
