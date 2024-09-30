import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { SingleChatComponent } from '../single-chat/single-chat.component';
import { KeyValuePipe, NgClass } from '@angular/common';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { NavbarBuyerComponent } from '../navbar-buyer/navbar-buyer.component';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [
    NavbarComponent,
    SingleChatComponent,
    NgClass,
    NavbarBuyerComponent,
    KeyValuePipe,
  ],
})
export class ChatComponent implements OnInit {
  stompClient: any;
  selectedChat: { from: boolean; msg: string }[] | null = null;
  selectedContact: { username: string; id: number; hasImage: boolean } | null =
    null;
  items: any;
  // [key: string]: { from: boolean; msg: string }[];
  contacts: { [key: string]: { from: boolean; msg: string }[] } = {};
  contactsImages: { [key: string]: { hasImage: boolean; id: number } } = {};
  authToken: string = '';
  username: string = '';

  constructor(
    private apiservice: ApiService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.authToken = this.authservice.getToken()!;
    this.username = this.authservice.getUsername()!;
    if (!this.authToken || !this.username) {
      this.router.navigate(['/login']);
    } else {
      this.connectWebSocket();
    }
  }

  connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/websocket-chat');
    this.stompClient = Stomp.over(socket);

    // Connecting to WebSocket with the token
    this.stompClient.connect(
      { Authorization: 'Bearer ' + this.authToken },
      (frame: any) => {
        console.log('Connected to WebSocket:', frame);
        // You can add the logic to show a message on the page as well
        const resultElement = document.getElementById('result');
        if (resultElement) {
          resultElement.innerText = 'WebSocket connected!';
        }

        this.getHistory();
      }
    );
  }

  getHistory() {
    // Retrieve entire message history for user
    this.apiservice.retrieveMessageHistory(this.username).subscribe({
      next: (response: any) => {
        // Start filtering the message history for viewing
        console.log('Retrieved chat history:', response);
        this.contacts = this.processChatHistory(response, this.username);
        for (const contact of Object.keys(this.contacts)) {
          this.authservice.getUserInfoByUsername(contact).subscribe({
            next: (contactData: any) => {
              this.contactsImages[contact] = {
                hasImage: !!contactData.profilePicturePath,
                id: contactData.id,
              };
            },
            error: (error) => {
              console.log('Error retrieving user info:', error);
            },
          });
        }
        // Subscribe to the user's personal queue
        this.subscribeToQueue(this.username);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          console.log('Error retrieving chat history:', error);
        }
      },
    });
  }

  processChatHistory(
    messages: { fromWho: string; toWhom: string; msg: string }[],
    currentUser: string
  ) {
    const contactMap: { [key: string]: { from: boolean; msg: string }[] } = {};
    // Iterate through each message
    messages.forEach((message: any) => {
      // Determine the contact (the person the user is chatting with)
      const contact: string =
        message.fromWho === currentUser ? message.toWhom : message.fromWho;

      // Determine if the message is from the current user
      const fromCurrentUser = message.fromWho === currentUser;

      // If the contact doesn't exist in the map, initialize their chat history
      if (!contactMap[contact]) {
        contactMap[contact] = [];
      }

      // Add the message to the contact's chat history
      contactMap[contact].push({
        from: fromCurrentUser, // true if it's from the current user
        msg: message.message,
      });
    });
    console.log('Processed chat history:', JSON.stringify(contactMap));
    return contactMap;
  }

  // Updated subscribeToQueue function
  subscribeToQueue(username: string) {
    // Subscribe to the user's queue, e.g., /queue/<username>
    const userQueue = `/queue/${username}`;

    // Add headers including 'ack', 'durable', and 'auto-delete'
    const headers = {
      Authorization: 'Bearer ' + this.authToken,
      ack: 'client',
      durable: 'true',
      'auto-delete': 'false',
    };

    // Subscribe with the additional headers
    this.stompClient.subscribe(
      userQueue,
      (message: any) => {
        console.log('Received message from queue:', message.body);
        const parsedMessage = JSON.parse(message.body);
        // You can add the logic to display the message
        //this.displayMessage(parsedMessage.fromWho, parsedMessage.message);
        message.ack(); // Acknowledge the message manually
      },
      headers
    );

    console.log(`Subscribed to: ${userQueue} with headers`, headers);
  }

  loadChat(contactName: string) {
    console.log('Loading chat:', contactName);
    this.selectedContact = {
      username: contactName,
      id: this.contactsImages[contactName].id,
      hasImage: this.contactsImages[contactName].hasImage,
    };
    this.selectedChat = this.contacts[contactName];
  }
}
