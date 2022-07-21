import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs/internal/Observable';
import { CodeSourceDao } from '../../code-editor/codeSourceDao';
import { OutputDao } from '../../code-editor/outputDao';

@Injectable({
  providedIn: 'root'
})
export class CodeEditorService {

  configUrl = "http://localhost:8080/code";

  constructor(private http: HttpClient) {  }

  postCode(codeSourceSent: CodeSourceDao): Observable<OutputDao> {
    const headers = { 'content-type': 'application/json'};
    const body = JSON.stringify(codeSourceSent);
    console.log(body);

    return this.http.post<OutputDao>(this.configUrl, body,{'headers':headers});
  }

}
