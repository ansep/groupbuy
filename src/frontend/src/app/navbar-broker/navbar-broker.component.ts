import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar-broker',
  standalone: true,
  imports: [],
  templateUrl: './navbar-broker.component.html',
  styleUrl: './navbar-broker.component.scss',
})
export class NavbarBrokerComponent {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Broker';
  }
}
