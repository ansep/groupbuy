import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-buyer',
  standalone: true,
  imports: [],
  templateUrl: './navbar-buyer.component.html',
  styleUrl: './navbar-buyer.component.scss',
})
export class NavbarBuyerComponent {
  username: string = '';
  avatar: string = 'assets/default-avatar.png';
  activeTab: 'home' | 'groups' | 'messages' | 'profile' = 'home';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Buyer';
    this.activeTab = this.router.url.split('/')[2] as
      | 'home'
      | 'groups'
      | 'messages'
      | 'profile';
    this.authService.getUserInfo(this.authService.getUserId()).subscribe({
      next: (user: any) => {
        if (user.profilePicturePath) {
          this.avatar =
            `http://localhost:8080/api/user/${user.id}/picture?t=` +
            new Date().getTime();
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  openHome() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/home']);
  }

  openJoinedListings() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/groups']);
  }

  openMessages() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/messages']);
  }

  openProfile() {
    this.router.navigate([
      '/' + localStorage.getItem('role') + '/profile/' + this.username,
    ]);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
