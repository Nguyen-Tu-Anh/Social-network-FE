import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Post} from "../../../../model/Post";
import {Comment} from "../../../../model/Comment";
import {Users} from "../../../../model/Users";
import {PostService} from "../../../../service/post.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-page-comment',
  templateUrl: './page-comment.component.html',
  styleUrls: ['./page-comment.component.css']
})
export class PageCommentComponent implements OnInit {
  @Input()
    // @ts-ignore
  comments: Comment[]

  @Input()// @ts-ignore
  post: Post;


  title = 'demoUploadFile';

  @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined;

  arrfiles: any = [];
  arrayPicture: string[] = [];

  // @ts-ignore
  name: string;
  // @ts-ignore
  content_comment: string;
  // @ts-ignore
  comment: Comment;

  // @ts-ignore
  image: string;

  // @ts-ignore
  users: Users;


  constructor(private postService: PostService, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.users = JSON.parse(window.sessionStorage.getItem("User_Key"));
  }

  ngSubmit() {
    this.comment = new Comment(
      this.content_comment,
      this.image = this.arrayPicture[0]
    )
    this.postService.createComment(this.comment, this.post.id).subscribe(data => {
      window.location.reload();
    })

  }

  submit() {
    for (let file of this.arrfiles) {
      if (file != null) {
        const filePath = file.name;
        const fileRef = this.storage.ref(filePath);
        this.storage.upload(filePath, file).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(
            url => {
              this.arrayPicture.push(url);
              console.log(url);
            })))
        ).subscribe();
      }
    }
  }

  uploadFileImg() {
    for (const argument of this.avatarDom1?.nativeElement.files) {
      this.arrfiles.push(argument)
    }
    this.submit();
  }


  // @ts-ignore
  findAllCommentByPostId(): [Comment[]] {
    this.postService.findAllComment().subscribe(data => {
      return data;
    })
  }

}
