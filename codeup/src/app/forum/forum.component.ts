import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserForumRelationService} from "../shared/services/userForumRelationService";
import {AuthService} from "../shared/services/authService";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public forum: any
  public hasJoinned = false;

  constructor(private route: ActivatedRoute, private userForumRelationService: UserForumRelationService, private authService: AuthService) {
    this.forum = route.snapshot.data['forumResolver'];
  }

  ngOnInit(): void {
    this.getUserForumRelation();
  }

  joinOrQuit() {

    if (this.hasJoinned) {
      console.log("inside")
      this.userForumRelationService.deleteUserForumRelation(this.forum.id).subscribe(value => {
        this.hasJoinned = !value;
      }, error => {
        this.hasJoinned = true;
      });
    } else {
      console.log("inside else")
      console.log(this.authService.loggedUser)
      if (this.authService.loggedUser) {
        console.log("inside if")
        this.userForumRelationService.addUserForumRelation(this.forum.id).subscribe(value => {
            this.hasJoinned = !!value;
          }
        );
      }
    }
  }

  getUserForumRelation() {
    this.userForumRelationService.getUserForumRelation(this.forum.id).subscribe(value => {
      console.log(value)
      if (value === null) {
        this.hasJoinned = false;
      } else {
        this.hasJoinned = true;
      }
    }, error => {
      this.hasJoinned = false;
    })
  }
}
