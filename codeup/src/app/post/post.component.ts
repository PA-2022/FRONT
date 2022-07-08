import { Component, OnInit } from '@angular/core';
import {Comment} from "../shared/entities/Comment";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../shared/entities/Post";
import {UserService} from "../shared/services/userService";
import {ForumService} from "../shared/services/forumService";
import {PostService} from "../shared/services/postService";
import {AuthService} from "../shared/services/authService";
import {PostVote} from "../shared/entities/PostVote";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  user: any;
  forum: any;
  comments: any;
  commentValue: String = "";
  respondId: any;
  respondUsername: string | undefined;
  public loggedUser = this.authService.loggedUser;
  editMessage: any | null | undefined;
  commentCount: any;
  userPostVote: any;


  constructor(private route: ActivatedRoute, private userService: UserService, private forumService: ForumService, private postService: PostService, private authService: AuthService) {
    this.post = route.snapshot.data['postResolver'];
    this.userService.getUserById(Number(this.post.userId)).subscribe(value => {
      this.user = value
    });
    this.forumService.getForumById(Number(this.post.forumId)).subscribe(value => {
      this.forum = value
    });
    this.getComments();
    if(this.post.id) {
      this.postService.getUserUpvote(this.post.id).subscribe(data => {
        this.userPostVote = data;
        console.log(this.userPostVote)
      });
    }
  }

  ngOnInit(): void {
  }

  scrollToElement($element: any): void {
    $element.scrollIntoView({behavior: "smooth", block: "end", inline: "end"});
  }

  getComments(): void {
    this.postService.getPostComments(Number(this.post.id)).subscribe(value => {
      this.comments = value;
      this.getPostCommentCount();
    })
  }


  sendComment() {
    if(this.editMessage) {
      this.editComment();
      return;
    }

    if(this.respondUsername){
      this.commentValue =  '@' + this.respondUsername.toString() + ' ' + this.commentValue.toString();
    }
    const comment: Comment = {
      id: null,
      content: this.commentValue.toString(),
      commentParentId: this.respondId ?? null,
      userId: null,
      code: null,
      postId: Number(this.post.id),
      creationDate: null,
      lastUpdateDate: null
    }
    this.postService.sendComment(comment).subscribe(value => {
      this.getComments();
      this.commentValue = "";
      this.respondUsername = undefined;
      this.respondId = null;
    });
  }

  delete(commentId: number) {
    if (confirm('Are you sure you want to delete your comment ?')) {
      this.postService.deleteComment(commentId).subscribe(response =>{
        this.getComments();
      });
    }
  }

  editSetup(comment: any) {
    this.editMessage = comment;
    this.commentValue = this.editMessage.content;
  }

  editComment(): void {
    this.editMessage.content = this.commentValue.toString();
    this.postService.editComment(this.editMessage).subscribe(data => {
      this.getComments();
      this.commentValue = '';
      this.respondId ='';
      this.respondUsername ='';
    });
  }

  getPostCommentCount(): void {
    this.postService.getCommentCount(Number(this.post.id)).subscribe(data => {
      this.commentCount = data;
    })
  }

  upvote(isUpvote: boolean) {
    console.log("in")
    const upvote: PostVote = {
      id: this.userPostVote ? this.userPostVote.id : null,
      upvote: isUpvote,
      postId: this.post.id,
      userId: null
    }
    this.postService.upvote(upvote).subscribe(data => {
      if(this.post.id) {
        this.postService.getPostById(this.post.id).subscribe(post => {
          this.post = post;
        })
      }
    });
  }
}
