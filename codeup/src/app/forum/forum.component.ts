import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from "@angular/router";
import {UserForumRelationService} from "../shared/services/userForumRelationService";
import {AuthService} from "../shared/services/authService";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public forum: any
  public hasJoinned = false;
  public loggedUser = this.authService.loggedUser;

  constructor(private route: ActivatedRoute, private userForumRelationService: UserForumRelationService,
              private authService: AuthService, private router: Router, private hiddenParamsService: HiddenParamsService) {
    this.forum = route.snapshot.data['forumResolver'];
  }

  ngOnInit(): void {
    this.getUserForumRelation();
  }

  joinOrQuit() {

    if (this.hasJoinned) {
      this.userForumRelationService.deleteUserForumRelation(this.forum.id).subscribe(value => {
        this.hasJoinned = !value;
      }, error => {
        this.hasJoinned = true;
      });
    } else {
      if (this.loggedUser) {
        this.userForumRelationService.addUserForumRelation(this.forum.id).subscribe(value => {
            this.hasJoinned = !!value;
          }
        );
      }
    }
  }

  getUserForumRelation() {
    this.userForumRelationService.getUserForumRelation(this.forum.id).subscribe(value => {
      if (value === null) {
        this.hasJoinned = false;
      } else {
        this.hasJoinned = true;
      }
    }, error => {
      this.hasJoinned = false;
    })
  }

  createPost() {
    this.hiddenParamsService.setParam(this.forum.id);
    this.router.navigate(
      ['/post-create']);
  }
}
