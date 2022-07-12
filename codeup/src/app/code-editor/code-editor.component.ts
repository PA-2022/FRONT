import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CodeEditorService } from './code-editor.service';
import { CodeSourceDao } from './codeSourceDao';
import { OutputDao } from './outputDao';

@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.sass']
})
export class CodeEditorComponent implements OnInit, OnChanges {
  @Input() output: String | undefined;
  @Input() code: String | undefined;
  @Output() codeChange = new EventEmitter<String>();

  constructor(private codeEditorService: CodeEditorService) { }

  ngOnChanges(): void {
    this.codeChange.emit(this.code);
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
    console.log();

    this.codeChange.emit(event);
  }

  tabIndentation(): void {
    console.log("tabIndent");
  }

}
