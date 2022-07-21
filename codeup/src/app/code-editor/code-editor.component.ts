import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';
import { CodeEditorService } from '../shared/services/code-editor.service';
import { CodeSourceDao } from './codeSourceDao';
import { OutputDao } from './outputDao';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.sass']
})
export class CodeEditorComponent implements OnInit, OnChanges, ContentEditorComponent {
  @Input() output: String | undefined;
  @Input() data: any;

  constructor(private codeEditorService: CodeEditorService) { }

  ngOnChanges(): void {
  }

  ngOnInit(): void {}

  runCode(language: string, code: string): void {
    const codeSource: CodeSourceDao = {
      language: language,
      code: code
    };

    this.codeEditorService.postCode(codeSource).subscribe(
      (response) => {
        this.output = JSON.stringify(response.output);
        console.log(response);
      }
    );

  }

  onCodeChange(event: any){
    this.data.code = event;
  }


  tabIndentation(): void {
    console.log("tabIndent");
  }

}
