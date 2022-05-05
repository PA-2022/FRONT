import { Component, OnInit } from '@angular/core';
import {Forum} from "../shared/entities/Forum";
import {ActivatedRoute} from "@angular/router";
import {Post} from "../shared/entities/Post";
import {UserService} from "../shared/services/userService";
import {ForumService} from "../shared/services/forumService";
import {User} from "../shared/entities/User";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  user: any;
  constructor(private route: ActivatedRoute, private userService: UserService, private forumService: ForumService) {
    this.post = route.snapshot.data['postResolver'];
    this.userService.getUserById(Number(this.post.userId)).subscribe(value => {
      this.user = value
      console.log(this.user)
    })
  }

  ngOnInit(): void {
  }

}
