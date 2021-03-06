import {Users} from "./Users";
import {Post} from "./Post";

export class Comment {
  // @ts-ignore
  public id: number;
  // @ts-ignore

  public content: string;
  // @ts-ignore

  public image: string;
  // @ts-ignore
  public time: Date;
  // @ts-ignore
  public users: Users;
  // @ts-ignore
  public post: Post;


  constructor(content: string, image: string) {
    this.content = content;
    this.image = image;
  }

}
