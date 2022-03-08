import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.prod";
import {Observable} from "rxjs";
import {Post} from "../model/Post";
import {Users} from "../model/Users";
import {Comment} from "../model/Comment";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) {
  }

  create(post: Post): Observable<any> {
    console.log(post)
    return this.http.post<any>(environment.API_LOCAL + 'posts/' + 'create', post);
  }

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.API_LOCAL + 'posts')
  }

  findById(id: number): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(environment.API_LOCAL + 'posts/' + id);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(environment.API_LOCAL + 'posts/' + id);

  }

  edit(post: Post, id: number): Observable<any> {
    return this.http.put<any>(environment.API_LOCAL + 'posts/' + id + '/edit', post);
  }

  getLikeNumber(): Observable<any> {
    return this.http.get<any>(environment.API_LOCAL + 'posts/' + 'getLikeNumber')
  }

  likePost(post: Post, idUsers: number): Observable<any> {
    return this.http.post<any>(environment.API_LOCAL + 'posts/' + idUsers + '/like', post);
  }

  createComment(comment: Comment, idPost: number): Observable<any> {
    return this.http.post<any>(environment.API_LOCAL + 'posts/' + idPost + '/createComment', comment)
  }

  findAllComment() {
    return this.http.get(environment.API_LOCAL + 'posts/comments')
  }
}
