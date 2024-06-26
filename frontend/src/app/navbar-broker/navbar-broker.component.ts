import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-broker',
  standalone: true,
  imports: [],
  templateUrl: './navbar-broker.component.html',
  styleUrl: './navbar-broker.component.scss',
})
export class NavbarBrokerComponent {
  username: string = '';
  avatar: string = 'assets/default-avatar.png';
  activeTab: 'home' | 'groups' | 'new' | 'messages' | 'profile' = 'home';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Broker';
    this.activeTab = this.router.url.split('/')[2] as
      | 'home'
      | 'groups'
      | 'new'
      | 'messages'
      | 'profile';
  }

  openHome() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/home']);
  }

  openGroups() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/groups']);
  }

  openNew() {
    this.router.navigate(['/' + localStorage.getItem('role') + '/new']);
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
