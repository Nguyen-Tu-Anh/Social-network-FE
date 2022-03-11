import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../service/user.service";
import {Users} from "../../../model/Users";

@Component({
  selector: 'app-add-friend',
  templateUrl: './add-friend.component.html',
  styleUrls: ['./add-friend.component.css']
})
export class AddFriendComponent implements OnInit {
  users: Users[] = [];
  status: string = "Add friend"
  // @ts-ignore
  user: Users;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem("User_Key"));
    this.findAll();

  }

  findAll() {
    this.userService.findAll(this.user.id).subscribe(data => {
      this.users = data;
    })
  }

  addFriend(id: number) {
    console.log("id -->", id)
    this.userService.addFriend(id, this.user).subscribe(data => {
      this.findAll();
    })
  }

}
