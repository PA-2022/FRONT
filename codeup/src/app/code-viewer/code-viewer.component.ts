import { Component, Input, OnInit } from '@angular/core';
import { CodeSourceDao } from '../code-editor/codeSourceDao';
import { CodeEditorService } from '../shared/services/code-editor.service';

@Component({
  selector: 'app-code-viewer',
  templateUrl: './code-viewer.component.html',
  styleUrls: ['./code-viewer.component.sass']
})
export class CodeViewerComponent implements OnInit {
  @Input() output: String | undefined;
  @Input() code: any;

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


  tabIndentation(): void {
    console.log("tabIndent");
  }
}
