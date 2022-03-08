import {Users} from "./Users";

export interface Messenger {
  id?: number;
  appUser?: Users;
  messenger?: string;
  romChatEntity?: any;
}
