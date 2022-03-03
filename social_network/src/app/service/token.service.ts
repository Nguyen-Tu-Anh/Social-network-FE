import {Injectable} from '@angular/core';
import {Users} from "../model/Users";

const TOKEN_KEY = 'Token_Key';
const NAME_KEY = 'Name_Key';
const ROLE_KEY = 'Role_Key';
const AVATAR_KEY = 'Avatar_Key';
const USER_KEY = 'User_Key';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];

  constructor() {
  }

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    // @ts-ignore
    return window.sessionStorage.getItem(TOKEN_KEY);
  }


  public setUser(user: Users) {
    window.sessionStorage.removeItem(USER_KEY);
    // @ts-ignore
    window.sessionStorage.setItem(USER_KEY, user);
  }

  public getUser(): Users {
    // @ts-ignore
    return window.sessionStorage.getItem(USER_KEY)
  }



  logout() {
    window.sessionStorage.clear();
    window.location.href = '';
  }
}
