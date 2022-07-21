import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor(private httpclient: HttpClient) {}


  lightSearch(search: String): Observable<any> {
    return this.httpclient.get<any>(
      'http://localhost:8080/search/light-search/' + search
    );
  }

  fullSearch(searchString: string) : Observable<any> {
    return this.httpclient.get<any>(
      'http://localhost:8080/search/' + searchString
    );
  }
}
