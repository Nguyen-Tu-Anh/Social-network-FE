import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "../model/Post";
import {environment} from "../../environments/environment.prod";
import {Users} from "../model/Users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  findAll(id: number): Observable<Users[]> {
    return this.http.get<Users[]>(environment.API_LOCAL + 'users/' + id +'/getStranger')
  }

  addFriend(id: number, sender: Users): Observable<any> {
    return this.http.post<any>(environment.API_LOCAL + 'users/' + id + '/addFriend', sender)
  }

  getFriendRequest(id: number): Observable<any> {
    return this.http.get<any>(environment.API_LOCAL + 'users/' + id + '/friendRequest')
  }
  acceptFriendRequest(id: number): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(environment.API_LOCAL + 'users/' + id + '/acceptFriendRequest')
  }
  rejectFriendRequest(id: number): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(environment.API_LOCAL + 'users/' + id + '/rejectFriendRequest')
  }


}
