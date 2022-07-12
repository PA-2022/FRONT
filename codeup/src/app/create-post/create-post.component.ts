import { AfterViewInit, ApplicationRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, ElementRef, HostListener, Inject, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HiddenParamsService} from "../shared/services/hiddenParamsService";
import {Post} from "../shared/entities/Post";
import {PostService} from "../shared/services/postService";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ForumService} from "../shared/services/forumService";
import {Forum} from "../shared/entities/Forum";
import { DOCUMENT } from '@angular/common';
import { CodeEditorComponent } from '../code-editor/code-editor.component';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements AfterViewInit {
  defaultCode = "// Write your code here";
  codeVisibility = false;
  addContentVisibility = false;

  @ViewChild('newCodeEditor')
  newCodeEditor!: TemplateRef<any>;
  @ViewChild('codeEditorBox', { read: ViewContainerRef })
  codeEditorBox!: ViewContainerRef;
  @ViewChild(CodeEditorComponent)
  codeEditorComponent: CodeEditorComponent | undefined;
  @ViewChild('addContentDiv')
  addContentDiv!: ElementRef;

  container!: ViewContainerRef;
  maxLengthTitle = 64;
  htmlContent: any;
  forumId: number = this.hiddenParamsService.getParam() ?? 1;
  forum: any = undefined;
  content: any = null;
  code: any = "// Write your code here";
  title: any = null;
  loading: boolean = false;
  postId: number | undefined | null = null;

  constructor(private hiddenParamsService: HiddenParamsService, private postService: PostService,
              private snackBar: MatSnackBar, private router: Router, private forumService: ForumService) {
    forumService.getForumById(this.forumId).subscribe(value => {
        this.forum = value;
    })
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (!this.addContentDiv.nativeElement.contains(event.target)) {
        this.addContentDiv.nativeElement.style.visibility = "hidden";
     }
  }

  createPost() {
    console.log(this.code);

    const post: Post = {
      id: null,
      title: this.title,
      content: this.content,
      code: this.code,
      creationDate: null,
      lastUpdateDate: null,
      userId: null,
      forumId: this.forumId,
      note: null
    }
    this.loading = true;
    this.postService.addPost(post).subscribe(value => {
      this.postId = value.id;
      this.snackBar.open("Created !", "You have been redirected !", {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.router.navigate(["/post/"+this.postId])
    }, error => {
      this.loading = false;
      this.snackBar.open("Error !", "An error has occured please try again !", {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    });
  }


  codeChange(code: String) {
    this.code = code;
  }

  addCodeEditor() {
    this.codeVisibility = true;
  }

  rmCodeEditor() {
    this.codeVisibility = false;
  }

  addContent(event: any) {
    this.addContentDiv.nativeElement.style.visibility = "visible";
    this.addContentDiv.nativeElement.style.top = event.pageY - 50 + "px";
    this.addContentDiv.nativeElement.style.left = event.pageX - 55 + "px";
  }

  addText(){
    console.log("ok text");
  }

  addCode(){
    this.codeEditorBox.createEmbeddedView(this.newCodeEditor);
    console.log("ok code");
  }


  isDisabled() {
    return !this.title || !this.content || this.loading;
  }
}
