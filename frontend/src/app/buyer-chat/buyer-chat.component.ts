import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SingleChatComponent } from '../single-chat/single-chat.component';
import { NgClass } from '@angular/common';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { connect } from 'rxjs';

@Component({
  selector: 'app-buyer-chat',
  standalone: true,
  templateUrl: './buyer-chat.component.html',
  styleUrl: './buyer-chat.component.scss',
  imports: [NavbarComponent, SingleChatComponent, NgClass],
})
export class BuyerChatComponent {
  data: any;
  stompClient: any;

  disconnect() {
    this.stompClient.deactivate();
    // setConnected(false);
    console.log('Disconnected');
  }

  sendName() {
    this.stompClient.publish({
      destination: '/app/hello', //euhm, what is this?
      // body: JSON.stringify({'name': $("#name").val()})
    });
  }

  getChat() {
    return this.selectedChat;
  }

  selectedChat: any;
  items: any;
  contacts: any;
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    // if (this.stompClient == null) {
    // //initiate stompClient
    // }
    this.stompClient = this.connect(
      this.authservice.getUsername(),
      this.authservice.getToken()
    );
    this.items = this.apiservice.getMessages();
    this.contacts = this.apiservice.getParticipants().slice(0, 15);
  }

  loadChat(contact: any) {
    this.selectedChat = contact;
  }

  initStomp() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:15674/ws',
      onConnect: () => {
        this.stompClient.subscribe('/topic/test01', (message: any) =>
          console.log(`Received: ${message.body}`)
        );
        this.stompClient.publish({
          destination: '/topic/test01',
          body: 'First Message',
        });
      },
      onWebSocketError: (error) => {
        console.error('Error with websocket', error);
      },
      onDisconnect: (error) => {
        console.error('Disconnected', error);
      },
      onStompError: (error) => {
        console.error('STOMP protocol error', error);
      },
      onUnhandledMessage: (message) => {
        console.error('Unhandled Message', message);
      },
    });
  }

  connect(username: string | null, token: string | null) {
    //1-1
    return new Promise((resolve, reject) => {
      let stompClient = Stomp.over(new SockJS('/websocket-chat'));
      stompClient.connect({ Authorization: 'Bearer ' + token }, (frame: any) =>
        resolve(stompClient)
      );
    });
  }

  // this.authservice.getRole()?.subscribe((data:any) => { // Change the type of 'data' to 'any[]'
  //   this.role = data;
  // });

  // this.role = this.authservice.getRole();
}
