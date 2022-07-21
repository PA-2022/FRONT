import { Component, Input, OnInit } from '@angular/core';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, ContentEditorComponent {
  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
  }


  onTextChange(event: any){
    this.data.text = event;
  }
}
