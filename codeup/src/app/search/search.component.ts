import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from "@angular/router";
import {SearchService} from "../shared/services/searchService";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public searchResults: any;

  constructor(private route: ActivatedRoute, private searchService: SearchService, private routing: Router) { }
  private searchString: string = "";
  ngOnInit(): void {
    const search = this.route.snapshot.paramMap.get("search");
    this.searchString = search ? search : "";
    this.searchService.fullSearch(this.searchString).subscribe(data => {
      this.searchResults = data;
    })
  }

  goToUser(id: number) {
    this.routing.navigate(["account/" + id]);
  }

  goToPost(id: number) {
    this.routing.navigate(["post/" + id]);

  }
}
