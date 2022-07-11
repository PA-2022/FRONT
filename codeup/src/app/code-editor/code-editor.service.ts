import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { CodeSourceDao } from './codeSourceDao';
import { OutputDao } from './outputDao';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  configUrl = "http://localhost:8080/code";

  constructor(private http: HttpClient) {  }

  postCode(codeSourceSent: CodeSourceDao): Observable<OutputDao> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(codeSourceSent);
    return this.http.post<OutputDao>(this.configUrl, body,{'headers':headers});
  }

}
