import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";
import {Post} from "../shared/entities/Post";
import {PostService} from "../shared/services/postService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ForumService} from "../shared/services/forumService";
import {Forum} from "../shared/entities/Forum";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {
  htmlContent: any;
  forumId: number = this.hiddenParamsService.getParam() ?? 1;
  forum: any = undefined;
  content: any = null;
  code: any = null;
  title: any = null;
  loading: boolean = false;
  postId: number | undefined | null = null;

  constructor(private hiddenParamsService: HiddenParamsService, private postService: PostService,
              private snackBar: MatSnackBar, private router: Router, private forumService: ForumService) {
    console.log(this.forumId)
    forumService.getForumById(this.forumId).subscribe(value => {
        this.forum = value;
    })
  }

  ngOnInit(): void {
  }

  createPost() {
    const post: Post = {
      id: null,
      title: this.title,
      content: this.content,
      code: this.code,
      creationDate: null,
      lastUpdateDate: null,
      userId: null,
      forumId: this.forumId,
      note: null
    }
    this.loading = true;
    this.postService.addPost(post).subscribe(value => {
      this.postId = value.id;
      this.snackBar.open("Created !", "You have been redirected !", {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(["/post/"+this.postId])
    }, error => {
      this.loading = false;
      this.snackBar.open("Error !", "An error has occured please try again !", {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }

  isDisabled() {
    return !this.title || !this.content || this.loading;
  }
}
