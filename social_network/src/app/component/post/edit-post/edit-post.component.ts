import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Post} from "../../../model/Post";
import {Users} from "../../../model/Users";
import {finalize} from "rxjs";
import {PostService} from "../../../service/post.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit {
  title = 'demoUploadFile';

  @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined;

  arrfiles: any = [];
  arrayPicture: string[] = [];

  // @ts-ignore
  name: string;
  // @ts-ignore
  post: Post;

  // @ts-ignore
  id: number;

  content: string = '';

  // @ts-ignore
  image: string;

  // @ts-ignore
  users: Users;

  constructor(public dialogRef: MatDialogRef<EditPostComponent>, private postService: PostService, private storage: AngularFireStorage, @Inject(MAT_DIALOG_DATA) public data: any
  ) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.post = this.data.dataKey;
    this.content = this.post.content;
    this.id = this.post.id;
    this.arrayPicture.push(this.post.image)
    // @ts-ignore
    this.users = JSON.parse(window.sessionStorage.getItem("User_Key"));
  }

  ngSubmit() {
    // @ts-ignore
    this.post = new Post(
      this.content,
      this.users,
      this.image = this.arrayPicture[0]
    )
    this.postService.edit(this.post, this.id).subscribe(data => {
      window.location.reload()
    })
  }


  submit() {
    this.arrayPicture.shift();
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


}
