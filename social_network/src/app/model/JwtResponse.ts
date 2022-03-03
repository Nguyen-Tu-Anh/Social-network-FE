import {Users} from "./Users";

export class JwtResponse {
    public token: string;
    public users: Users;


  constructor(token: string, userAccount: Users) {
    this.token = token;
    this.users = userAccount;
  }
}
