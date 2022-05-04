import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  public forum: any
  constructor(private route: ActivatedRoute) {
    this.forum = route.snapshot.data['forumResolver'];
    console.log(this.forum)
  }

  ngOnInit(): void {
  }

}
