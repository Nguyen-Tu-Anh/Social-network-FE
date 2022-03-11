import {Users} from "./Users";
import {Comment} from "./Comment";


export class Post {
  // @ts-ignore
  public id:number;
  public content: string;
  public users: Users;
  // @ts-ignore
  public time: Date;
  public image: string;
  public status?: boolean;
  // @ts-ignore
  public comments: Comment[];



  constructor(content: string, users: Users, image: string) {
    this.content = content;
    this.users = users;
    this.image = image;
  }
}
