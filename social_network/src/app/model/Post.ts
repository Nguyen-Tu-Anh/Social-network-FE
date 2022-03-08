import {Users} from "./Users";


export class Post {
  // @ts-ignore
  public id:number;
  public content: string;
  public users: Users;
  // @ts-ignore
  public time: Date;
  public image: string;
  public status?: boolean;




  constructor(content: string, users: Users, image: string) {
    this.content = content;
    this.users = users;
    this.image = image;
  }
}
