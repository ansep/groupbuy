import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-single-chat',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './single-chat.component.html',
  styleUrl: './single-chat.component.scss',
})
export class SingleChatComponent {
  @Input() chat: any;
  @Input() contact: { username: string; id: number; hasImage: boolean } | null =
    null;
  @Output() sendMessage = new EventEmitter<string>();
  sendMessageForm = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private apiservice: ApiService) {}

  send() {
    if (this.sendMessageForm.value.message) {
      this.sendMessage.emit(this.sendMessageForm.value.message);
      this.sendMessageForm.reset();
    }
  }
}
