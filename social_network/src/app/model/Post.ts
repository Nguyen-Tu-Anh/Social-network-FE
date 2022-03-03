import {Users} from "./Users";


export class Post {
  // @ts-ignore
  public id:number;
  public content: string;
  public users: Users;
  // @ts-ignore
  public time: Date;
  public image: string;




  constructor(content: string, users: Users, image: string) {
    this.content = content;
    this.users = users;
    this.image = image;
  }
}
