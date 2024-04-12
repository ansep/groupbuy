import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { OpenGroupsListComponent } from '../open-groups-list/open-groups-list.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-unlogged',
  standalone: true,
  imports: [NavbarComponent, OpenGroupsListComponent],
  templateUrl: './dashboard-unlogged.component.html',
  styleUrl: './dashboard-unlogged.component.scss',
})
export class DashboardUnloggedComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    const role = localStorage.getItem('role');
    if (role === 'buyer') {
      this.router.navigate(['/buyer/home']);
    } else if (role === 'broker') {
      this.router.navigate(['/broker/home']);
    }
  }
}
