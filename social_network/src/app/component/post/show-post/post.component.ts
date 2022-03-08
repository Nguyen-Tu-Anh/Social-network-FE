import {Component, OnInit} from '@angular/core';
import {Post} from "../../../model/Post";
import {PostService} from "../../../service/post.service";
import {RegisterComponent} from "../../register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPostComponent} from "../edit-post/edit-post.component";
import {Users} from "../../../model/Users";

@Component({
  selector: 'app-show-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];
  // @ts-ignore
  user: Users;
  likeNumbers: number[] = [];
  // @ts-ignore
  color: string = "#adadfd";
  like: any = {
    message: "like"
  }

  constructor(private postService: PostService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAllPost();
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem("User_Key"));
    this.getLikeNumber();
  }

  findAllPost() {
    // @ts-ignore
    this.postService.findAll().subscribe(data => {
      this.posts = data;
    });
  }

  openFormEditPost(post: Post) {
    const dialogRef = this.matDialog.open(EditPostComponent, {
      role: 'dialog',
      height: '480px',
      width: '480px',
      data: {
        dataKey: post
      }
    });
  }

  delete(post: Post) {
    this.postService.deleteById(post.id).subscribe(data => {
      window.location.reload();
    })
  }

  likePost(post: Post) {
    this.postService.likePost(post, this.user.id).subscribe(data => {
      this.findAllPost();
      this.getLikeNumber();
    })
  }

  getLikeNumber() {
    this.postService.getLikeNumber().subscribe(data => {
      this.likeNumbers = data;
    })
  }

}
