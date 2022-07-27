import { Component, OnInit } from '@angular/core';
import {Post} from "../shared/entities/Post";
import {Forum} from "../shared/entities/Forum";
import {PostService} from "../shared/services/postService";
import {ForumService} from "../shared/services/forumService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-forum',
  templateUrl: './create-forum.component.html',
  styleUrls: ['./create-forum.component.scss']
})
export class CreateForumComponent implements OnInit {
  title: any   = null;
  maxLengthTitle = 20;
  loading: boolean = false;
  description: any = null;
  color: any;

  constructor(private forumService: ForumService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
  }

  isDisabled() {
    return !this.title || this.title.length > this.maxLengthTitle || this.title === 0 || !this.description || this.description.length < 20 || !this.color
  }

  createForum() {
    const forum: any = {
      id: null,
      title: this.title,
      description: this.description,
      creationDate: null,
      lastUpdateDate: null,
      color: this.color,
    }
    this.forumService.createForum(forum).subscribe(response => {
      this.snackBar.open("Forum created !", "You will be redirected.", {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      return this.router.navigate(['forum/' + response]);
    }, error => {
      this.snackBar.open("An error has occured ...", "Try again", {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });

  }
}
