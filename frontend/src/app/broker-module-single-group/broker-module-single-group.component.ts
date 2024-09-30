import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

@Component({
  selector: 'app-broker-module-single-group',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './broker-module-single-group.component.html',
  styleUrl: './broker-module-single-group.component.scss',
})
export class BrokerModuleSingleGroupComponent {
  @Input() groupBuyId: number = 0;
  @Input() groupBuyName: string = '';
  @Input() closedGroup: boolean = true;
  @Input() participants: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    profilePicturePath: string;
  }[] = [];
  @Output() closeGroupEmit = new EventEmitter<void>();
  broadcastMessageForm = new FormGroup({
    message: new FormControl('', Validators.required),
  });

  @ViewChild('closeBroadcastModal') closeBroadcastModal: ElementRef | undefined;
  stompClient: any = null;
  connectedWebSocket: boolean = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}

  openChatWithUser(id: number) {
    this.router.navigate([this.authService.getRole(), 'chat', id]);
  }

  editGroupBuy() {
    this.router.navigate([this.authService.getRole(), 'edit', this.groupBuyId]);
  }

  deleteGroupBuy() {
    const confirm = window.confirm(
      'Are you sure you want to delete this group buy?'
    );
    if (!confirm) {
      return;
    }
    this.apiService.deleteGroupBuy(this.groupBuyId).subscribe({
      next: (response) => {
        this.router.navigate([this.authService.getRole(), 'home'], {
          queryParams: { deleted: true },
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  finalizeGroupBuy() {
    const confirm = window.confirm(
      'Are you sure you want to finalize this group buy?'
    );
    if (!confirm) {
      return;
    }
    this.apiService.finalizeGroupBuy(this.groupBuyId).subscribe({
      next: (response) => {
        this.closedGroup = true;
        this.closeGroupEmit.emit();
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  openBuyerProfile(username: string) {
    this.router.navigate(['broker/profile', username]);
  }

  async broadcastMessage() {
    if (!this.broadcastMessageForm.value.message) {
      return;
    }
    this.broadcastMessageForm.disable();
    console.log(
      'Broadcasting message:',
      this.broadcastMessageForm.value.message
    );
    this.connectWebSocket();
    let attempts = 0;
    while (!this.connectedWebSocket && attempts < 20) {
      console.log('Waiting for WebSocket connection...');
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (!this.connectedWebSocket) {
      console.error('Failed to connect to WebSocket');
      this.disconnectWebSocket();
      this.broadcastMessageForm.enable();
      return;
    }
    this.sendBroadcastMessage(
      this.groupBuyName + ': ' + this.broadcastMessageForm.value.message
    );
    this.disconnectWebSocket();
    if (this.closeBroadcastModal) {
      this.closeBroadcastModal.nativeElement.click();
    }
  }

  async connectWebSocket() {
    const socket = new SockJS('http://localhost:8080/websocket-chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect(
      { Authorization: 'Bearer ' + this.authService.getToken() },
      (frame: any) => {
        console.log('Connected to WebSocket:', frame);
        this.connectedWebSocket = true;
      }
    );
  }
  disconnectWebSocket() {
    this.connectedWebSocket = false;
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  sendBroadcastMessage(message: string) {
    this.participants.forEach((participant) => {
      const payload = {
        toWhom: participant.username,
        fromWho: this.authService.getUsername(),
        message: message,
      };
      if (this.stompClient) {
        this.stompClient.send('/app/message', {}, JSON.stringify(payload));
      }
    });
  }
}
