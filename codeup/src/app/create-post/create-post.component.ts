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
import { NewContentItem } from '../shared/entities/NewContentItem';
import { ContentEditorComponent } from '../shared/entities/ContentEditorComponent';
import { TextEditorComponent } from '../text-editor/text-editor.component';
import { Content } from '../shared/entities/Content';
import { PostContent } from '../shared/entities/PostContent';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements AfterViewInit {
  defaultCode = "# Write your code here";
  allContent: NewContentItem[] = [];
  allContentPost: Content[] = []
  codeVisibility = false;
  addContentVisibility = false;

  @ViewChild('newCodeEditor')
  newCodeEditor!: TemplateRef<any>;
  @ViewChild('newTextarea')
  newTextarea!: TemplateRef<any>;
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
    this.addText();
  }

  ngOnInit(): void {
  }



  createPost() {
    const post: Post = {
      id: null,
      title: this.title,
      content: null,
      code: null,
      creationDate: null,
      lastUpdateDate: null,
      userId: null,
      forumId: this.forumId,
      note: null
    }

    this.pushCodeAndTextInAllContentPost();
    console.log(this.allContentPost);

    let contentPost = new PostContent(post, this.allContentPost);

    this.loading = true;
    this.postService.addPost(contentPost).subscribe(value => {
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


  codeChange(data: any) {
    console.log("code change " + data.index + " " + data.code);
  }

  addContent(event: any) {
    this.addContentDiv.nativeElement.style.visibility = "visible";
    this.addContentDiv.nativeElement.style.top = event.pageY - 50 + "px";
    this.addContentDiv.nativeElement.style.left = event.pageX - 55 + "px";
  }

  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event: any): void {
     if (!this.addContentDiv.nativeElement.contains(event.target)) {
        this.addContentDiv.nativeElement.style.visibility = "hidden";
     }
  }

  addText(){
    this.allContent.push(new NewContentItem(TextEditorComponent, {index: this.allContent.length, text: ""}));
    let newCode = this.codeEditorBox.createComponent<ContentEditorComponent>(this.allContent[this.allContent.length - 1].component);
    newCode.instance.data = this.allContent[this.allContent.length - 1].data;

    this.addContentDiv.nativeElement.style.visibility = "hidden";
  }

  addCode(){
    this.allContent.push(new NewContentItem(CodeEditorComponent, {index: this.allContent.length, code: this.defaultCode}));
    let newCode = this.codeEditorBox.createComponent<ContentEditorComponent>(this.allContent[this.allContent.length - 1].component);
    newCode.instance.data = this.allContent[this.allContent.length - 1].data;

    this.addContentDiv.nativeElement.style.visibility = "hidden";
  }


  pushCodeAndTextInAllContentPost() {
    this.content = "";
    let i = 0;
    this.allContent.forEach(value => {
      if (value.component === CodeEditorComponent) {
        this.allContentPost.push(new Content(null, value.data.code, null, 1, i));
      } else if (value.component === TextEditorComponent) {
        this.allContentPost.push(new Content(null, value.data.text, null, 0, i));
      }

      i++;
    }
    )
  }


  isDisabled() {
    return !this.title || this.loading;
  }
}
