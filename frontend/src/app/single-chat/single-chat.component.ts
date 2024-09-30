import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  @ViewChild('chatHistory') private chatHistoryContainer!: ElementRef;
  chatLength: number = 0;

  constructor(private router: Router, private authService: AuthService) {}

  ngAfterViewChecked() {
    if (this.chat.length !== this.chatLength) {
      this.scrollToBottom();
      this.chatLength = this.chat.length;
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatHistoryContainer.nativeElement.scrollTop =
        this.chatHistoryContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Error scrolling to bottom:', err);
    }
  }
  send() {
    if (this.sendMessageForm.value.message) {
      this.sendMessage.emit(this.sendMessageForm.value.message);
      this.sendMessageForm.reset();
    }
  }

  openUserProfile(username: string | undefined) {
    if (!username) return;
    this.router.navigate([this.authService.getRole(), 'profile', username]);
  }
}
