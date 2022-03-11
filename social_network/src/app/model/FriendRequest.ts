import {Users} from "./Users";

export class FriendRequest {
  public id: number;
  public status: string;
  public sender: Users;
  public receiver: Users;


  constructor(id: number, status: string, sender: Users, receiver: Users) {
    this.id = id;
    this.status = status;
    this.sender = sender;
    this.receiver = receiver;
  }
}
