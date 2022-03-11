import { Component, OnInit } from '@angular/core';
import {Users} from "../../model/Users";
import {TokenService} from "../../service/token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  // @ts-ignore
  user:Users;

  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {

    // @ts-ignore
    this.user = JSON.parse(window.sessionStorage.getItem("User_Key"));
  }

  logout() {
    this.tokenService.logout();
  }

}
