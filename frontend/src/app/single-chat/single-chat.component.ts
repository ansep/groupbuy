import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-single-chat',
  standalone: true,
  imports: [],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss',
})
export class SingleChatComponent {
  @Input() chat: any;
  @Input() contact: { username: string; id: number; hasImage: boolean } | null =
    null;

  messages: any[] = []; // TODO: remove
  constructor(private apiservice: ApiService) {}
  async ngOnInit() {
    try {
      this.messages = (await this.apiservice.getMessages()).slice(0, 15); // Wait for the promise to resolve
      console.log(this.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  async refreshMessages() {
    try {
      this.messages = (await this.apiservice.getMessages()).slice(0, 15); // Wait for the promise to resolve
      console.log(this.messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }
}
