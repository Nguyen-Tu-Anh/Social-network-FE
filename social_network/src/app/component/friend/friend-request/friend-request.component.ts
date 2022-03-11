import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../service/user.service";
import {FriendRequest} from "../../../model/FriendRequest";
import {Users} from "../../../model/Users";

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  listFriendRequest: FriendRequest[] = [];
  // @ts-ignore
  user: Users;

  numberOfRequest!: number;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem("User_Key"));
    this.getFriendRequest(this.user.id);
  }

  getFriendRequest(id: number) {
    this.userService.getFriendRequest(id).subscribe(data => {
          this.listFriendRequest = data;
          this.numberOfRequest = this.listFriendRequest.length;
    })
  }

  accept(id: number) {
    console.log("idRequest---->", id)
    this.userService.acceptFriendRequest(id).subscribe(data => {
      this.getFriendRequest(this.user.id);

    })
  }

  reject(id: number) {
    this.userService.rejectFriendRequest(id).subscribe(data => {
      this.getFriendRequest(this.user.id);
    })
  }



}
