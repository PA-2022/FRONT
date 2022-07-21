import { Component, OnInit } from '@angular/core';
import {Comment} from "../shared/entities/Comment";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../shared/entities/Post";
import {UserService} from "../shared/services/userService";
import {ForumService} from "../shared/services/forumService";
import {PostService} from "../shared/services/postService";
import {AuthService} from "../shared/services/authService";
import {PostVote} from "../shared/entities/PostVote";
import {CommentVote} from "../shared/entities/CommentVote";
import { Content } from '../shared/entities/Content';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  contents: Content[] | undefined;
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

    console.log(this.post);
    this.postService.getPostContentByPostId(Number(this.post.id)).subscribe(value => {
      this.contents = value
      console.log(this.contents)
    });


    this.getComments();
    if(this.post.id && this.loggedUser) {
      this.postService.getUserUpvote(this.post.id).subscribe(data => {
        this.userPostVote = data;
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
        });
        this.postService.getUserUpvote(this.post.id).subscribe(data => {
          this.userPostVote = data;
        });
      }

    });
  }
  upvoteComment(isUpvote: boolean, comment: any, parentId: number|null) {
    const upvote: CommentVote = {
      id:  comment.optionalCommentVote ? comment.optionalCommentVote.id : null,
      upvote: isUpvote,
      commentId: comment.comment.id,
      userId: null
    }

    this.postService.upvoteComment(upvote).subscribe(data => {
      this.postService.getCommentById(comment.comment.id).subscribe(commentValue => {
        if(!!parentId) {
          let parentIndex = this.comments.findIndex((x: any) => x.comment.comment.id === parentId);
          let currentCommentIndex = this.comments[parentIndex].responses.findIndex((y:any) => y.comment.id === comment.comment.id);
          this.comments[parentIndex].responses[currentCommentIndex].comment = commentValue.comment.comment;
          this.comments[parentIndex].responses[currentCommentIndex].optionalCommentVote = commentValue.comment.optionalCommentVote;
        } else {
          let index = this.comments.findIndex((x: any) => x.comment.comment.id === comment.comment.id);
          this.comments[index] = commentValue;
        }
      });
    });
  }
}
