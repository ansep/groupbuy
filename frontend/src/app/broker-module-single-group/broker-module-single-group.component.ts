import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-broker-module-single-group',
  standalone: true,
  imports: [],
  templateUrl: './broker-module-single-group.component.html',
  styleUrl: './broker-module-single-group.component.scss',
})
export class BrokerModuleSingleGroupComponent {
  @Input() groupBuyId: number = 0;
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
}
