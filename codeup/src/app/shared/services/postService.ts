import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable} from 'rxjs';
import {Post} from "../entities/Post";
import {Comment} from "../entities/Comment";
import {PostVote} from "../entities/PostVote";
import {CommentVote} from "../entities/CommentVote";
import { PostContent } from '../entities/PostContent';
import { Content } from '../entities/Content';
import { CommentContent } from '../entities/CommentContent';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private httpclient: HttpClient) {
  }

  public addPost(postContent: PostContent): Observable<Post> {
    return this.httpclient.post<Post>(
      'http://localhost:8080/posts/add' , postContent
    );
  }


  public getPostById(id: number): Observable<Post> {
    return this.httpclient.get<Post>('http://localhost:8080/posts/' + id);
  }

  public getPostContentByPostId(id: number): Observable<Content[]> {
    return this.httpclient.get<Content[]>('http://localhost:8080/posts/' + id + '/content');
  }

  public getPostComments(id: number): Observable<any> {
    return this.httpclient.get<any>('http://localhost:8080/comments/comment/post/' + id)
  }

  sendComment(commentContent: CommentContent) {
    return this.httpclient.post<Comment>(
      'http://localhost:8080/comments' , commentContent
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

  upvote(comment: PostVote) {
    return this.httpclient.put<PostVote>(
      'http://localhost:8080/posts-vote' , comment
    );
  }
  getUserUpvote(postId: number) {
    return this.httpclient.get<PostVote>(
      'http://localhost:8080/posts-vote/post/' + postId
    );
  }

  upvoteComment(upvote: CommentVote) {
    return this.httpclient.put<CommentVote>(
      'http://localhost:8080/comment-votes' , upvote
    );
  }

  getCommentById(commentId: number) {
    return this.httpclient.get<any>(
      'http://localhost:8080/comments/comment-post/' + commentId
    )
  }

  getPostsForForum(id: Number, category: String, offset: number, limit: number) {
    return this.httpclient.get<any>(
      'http://localhost:8080/posts/post-list/forum/' + id + '/category/' + category + '/offset/' + offset + '/limit/' + limit
    )
  }

  getPostsForHome(category: string, offset: number, limit: number) {
    return this.httpclient.get<any>(
      'http://localhost:8080/posts/post-list/category/' + category + '/offset/' + offset + '/limit/' + limit
    )  }
}
