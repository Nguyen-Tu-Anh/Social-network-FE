import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../service/token.service";
import {Users} from "../../model/Users";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // @ts-ignore
  user: Users;
  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem("User_Key"));
  }



  reload() {
    window.location.reload();
  }



}
