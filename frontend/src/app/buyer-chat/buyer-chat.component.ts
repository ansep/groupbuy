import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { SingleChatComponent } from "../single-chat/single-chat.component";
import { NgClass } from '@angular/common';
import { Client } from '@stomp/stompjs';
@Component({
    selector: 'app-buyer-chat',
    standalone: true,
    templateUrl: './buyer-chat.component.html',
    styleUrl: './buyer-chat.component.scss',
    imports: [NavbarComponent, SingleChatComponent, NgClass]
})
export class BuyerChatComponent {
data: any;
stompClient = new Client({
  brokerURL: 'ws://localhost:15674/ws',
  onConnect: () => {
    this.stompClient.subscribe('/topic/test01', message =>
      console.log(`Received: ${message.body}`)
    );
    this.stompClient.publish({ destination: '/topic/test01', body: 'First Message' });
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
}


});





connect() {
  this.stompClient.activate();
}

disconnect() {
  this.stompClient.deactivate();
  // setConnected(false);
  console.log("Disconnected");
}

 sendName() {
  this.stompClient.publish({
      destination: "/app/hello", //euhm, what is this?
      // body: JSON.stringify({'name': $("#name").val()})
  });
}






getChat() {
return this.selectedChat;
}
  selectedChat:any;
  items:any;
  contacts:any;
  constructor(private apiservice:ApiService, private router:Router, private authservice:AuthService){
  }

  ngOnInit() {

      this.items = this.apiservice.getMessages();
      this.contacts = this.apiservice.getParticipants().slice(0, 15);
    }

  loadChat(contact:any) {
    this.selectedChat = contact;


  }


    // this.authservice.getRole()?.subscribe((data:any) => { // Change the type of 'data' to 'any[]'
    //   this.role = data;
    // });

    // this.role = this.authservice.getRole();

  }

