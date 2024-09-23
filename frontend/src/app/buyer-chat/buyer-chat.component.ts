import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SingleChatComponent } from '../single-chat/single-chat.component';
import { NgClass } from '@angular/common';
import { Client, Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { NavbarBuyerComponent } from "../navbar-buyer/navbar-buyer.component";

@Component({
  selector: 'app-buyer-chat',
  standalone: true,
  templateUrl: './buyer-chat.component.html',
  styleUrl: './buyer-chat.component.scss',
  imports: [NavbarComponent, SingleChatComponent, NgClass, NavbarBuyerComponent],
})
export class BuyerChatComponent implements OnInit {
  data: any;
  stompClient: any;
  selectedChat: any;
  items: any;
  contacts: any;
  authToken: string = ''; // Add a field for the auth token
  username: string = ''; // Add a field for the username

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private authservice: AuthService // Inject AuthService
  ) {}

  ngOnInit() {
    // Get the authToken and username from the AuthService
    this.authToken = this.authservice.getToken()!;  // Assuming getAuthToken() returns the token
    this.username = this.authservice.getUsername()!;    // Assuming getUsername() returns the username

    // Call the connectWebSocket function when the component initializes
    this.connectWebSocket();
  }

  connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/websocket-chat');
    this.stompClient = Stomp.over(socket);

    // Connecting to WebSocket with the token
    this.stompClient.connect({ Authorization: "Bearer " + this.authToken }, (frame: any) => {
      console.log('Connected to WebSocket:', frame);
      // You can add the logic to show a message on the page as well
      const resultElement = document.getElementById('result');
      if (resultElement) {
        resultElement.innerText = 'WebSocket connected!';
      }

      this.getHistory();

      // Subscribe to the user's personal queue
      this.subscribeToQueue(this.username);
    });
  }

  getHistory() {

  }

  // Updated subscribeToQueue function
  subscribeToQueue(username: string) {
    // Subscribe to the user's queue, e.g., /queue/<username>
    const userQueue = `/queue/${username}`;

    // Add headers including 'ack', 'durable', and 'auto-delete'
    const headers = {
      'Authorization': "Bearer " + this.authToken,
      'ack': 'client',
      'durable': 'true',
      'auto-delete': 'false'
    };

    // Subscribe with the additional headers
    this.stompClient.subscribe(userQueue, (message: any) => {
      console.log('Received message from queue:', message.body);
      const parsedMessage = JSON.parse(message.body);
      // You can add the logic to display the message
      //this.displayMessage(parsedMessage.fromWho, parsedMessage.message);
      message.ack(); // Acknowledge the message manually
    }, headers);

    console.log(`Subscribed to: ${userQueue} with headers`, headers);
  }

  loadChat(contacts) {

  }

}

