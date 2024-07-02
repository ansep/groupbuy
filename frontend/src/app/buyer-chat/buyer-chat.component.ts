import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from "../navbar/navbar.component";
import { SingleChatComponent } from "../single-chat/single-chat.component";

@Component({
    selector: 'app-buyer-chat',
    standalone: true,
    templateUrl: './buyer-chat.component.html',
    styleUrl: './buyer-chat.component.scss',
    imports: [NavbarComponent, SingleChatComponent]
})
export class BuyerChatComponent {
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
    //this.router.navigate(['buyer/messages', contact.id]); TODO ENABLE THE OTHER COMPONENT
    console.log("Chat with " + contact.name);
  }
    // this.authservice.getRole()?.subscribe((data:any) => { // Change the type of 'data' to 'any[]'
    //   this.role = data;
    // });

    // this.role = this.authservice.getRole();

  }

