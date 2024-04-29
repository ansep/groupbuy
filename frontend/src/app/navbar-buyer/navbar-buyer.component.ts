import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar-buyer',
  standalone: true,
  imports: [],
  templateUrl: './navbar-buyer.component.html',
  styleUrl: './navbar-buyer.component.scss',
})
export class NavbarBuyerComponent {
  username: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.username = this.authService.getUsername() || 'Buyer';
  }
}
