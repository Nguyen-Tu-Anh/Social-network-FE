import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Users} from "../../../model/Users";
import {PostService} from "../../../service/post.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize} from "rxjs";
import {Post} from "../../../model/Post";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  title = 'demoUploadFile';

  @ViewChild('uploadFile1', {static: true}) public avatarDom1: ElementRef | undefined;

  arrfiles: any = [];
  arrayPicture: string[] = [];

  // @ts-ignore
  name: string;
  // @ts-ignore
  post: Post;
  // @ts-ignore
  content: string;

  // @ts-ignore
  image: string;

  // @ts-ignore
  users: Users;

  constructor(private postService: PostService, private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.name = JSON.parse(window.sessionStorage.getItem("User_Key")).name;
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
    this.postService.create(this.post).subscribe(data => {
      window.location.reload()
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

}
