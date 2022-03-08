import {Injectable} from '@angular/core';
import {Messenger} from "../model/Messenger";
import {HttpClient} from "@angular/common/http";
import {Users} from "../model/Users";
// @ts-ignore
import {Stomp} from '@stomp/stompjs';


@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {
  // @ts-ignore
  idRomChat: number;
  userNameFriend = 'toan2';
  greetings: string[] = [];
  disabled = true;
  // @ts-ignore
  name: string;
  message = 'ơ kìa';
  stompClient = null;
  // @ts-ignore
  listMessenger: Messenger[];
  // @ts-ignore
  currentUser: Users;
  // @ts-ignore
  http: HttpClient;
  // @ts-ignore
  userFriend: Users;

  constructor() {
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.greetings = [];
    }
  }

  async connect(userNameFriend: any) {
    // @ts-ignore
    this.disconnect();
    console.log("--------------------");
    console.log(userNameFriend);
    console.log(this.currentUser.username);
    console.log("--------------------");
    let username = this.currentUser.username;
    let idRomChat = this.idRomChat;
    let message = this.message;

    const socket = new WebSocket('ws://localhost:8080/gkz-stomp-endpoint/websocket');
    this.stompClient = Stomp.over(socket);
    const thisSocket = this;

    // @ts-ignore
    this.stompClient.connect({}, function (frame) {
      console.log("--------------------");
      console.log("đã vào connect");
      console.log("--------------------");
      thisSocket.setConnected(true);

      // @ts-ignore
      thisSocket.stompClient.subscribe('/topic/public/' + idRomChat, function () {
        // @ts-ignore
        thisSocket.showGreeting();
      });

      // @ts-ignore
      thisSocket.stompClient.send('/gkz/chatVsUser', {},
        JSON.stringify({'name': username, 'userNameFriend': userNameFriend}));

      // @ts-ignore
      thisSocket.getAllMessengerByIdRom(idRomChat);

    });
  }


  getAllMessengerByIdRom(idRomChat: any) {
    console.log('------------------------');
    console.log('Bạn vào getAllMessenger');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/allChat/' + idRomChat;
    this.http.get<Messenger[]>(url).subscribe((resJson) => {
      this.listMessenger = resJson;
      console.log('this.listMessenger');
      console.log(this.listMessenger);
    });
  }

  async getRomChat(userName1: any, userName2: any) {
    console.log('------------------------');
    console.log('Bạn vào getRoomChat');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/findRomChat/' + userName1 + '/' + userName2;
    this.http.get<number>(url).subscribe((resJson) => {
      this.idRomChat = resJson;
      this.connect(userName2);
    });
    console.log('-----------------------------');
    console.log(this.idRomChat);
    console.log('-----------------------------');

  }

  createRomChat(userName1: any, userName2: any, userFriend: any) {
    this.userFriend = userFriend;
    console.log('------------------------');
    console.log('Bạn vào CreateRomChat');
    console.log('------------------------');
    const url = 'http://localhost:8080/api/addRomchat/' + userName1 + '/' + userName2;
    this.http.get(url).subscribe((resJson) => {
      console.log('tạo phòng oke');
      this.getRomChat(userName1, userName2);
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      // @ts-ignore
      this.stompClient.disconnect();
      console.log('Disconnected!');

    }

    this.setConnected(false);
  }

  sendName() {
    console.log('------------------------');
    console.log('Bạn vào SendMess');
    console.log(this.message);
    console.log('------------------------');
    console.log(this.stompClient);
    // @ts-ignore
    this.stompClient.send(
      '/gkz/chat.newUser',
      {},
      JSON.stringify({'name': this.currentUser.username, 'message': this.message})
    );
    this.message = '';
  }

  showGreeting() {
    this.getAllMessengerByIdRom(this.idRomChat);
  }
}
