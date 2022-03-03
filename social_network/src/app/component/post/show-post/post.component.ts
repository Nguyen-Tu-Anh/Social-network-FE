import {Component, OnInit} from '@angular/core';
import {Post} from "../../../model/Post";
import {PostService} from "../../../service/post.service";
import {RegisterComponent} from "../../register/register.component";
import {MatDialog} from "@angular/material/dialog";
import {EditPostComponent} from "../edit-post/edit-post.component";

@Component({
  selector: 'app-show-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postService: PostService, private matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.findAllPost();
  }

  findAllPost() {
    // @ts-ignore
    this.postService.findAll().subscribe(data => {
      this.posts = data
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
}
