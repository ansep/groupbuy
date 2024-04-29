import { Component } from '@angular/core';
import { NavbarBuyerComponent } from '../navbar-buyer/navbar-buyer.component';
import { OpenGroupsListComponent } from '../open-groups-list/open-groups-list.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-buyer',
  standalone: true,
  imports: [NavbarBuyerComponent, RouterOutlet],
  templateUrl: './dashboard-buyer.component.html',
  styleUrl: './dashboard-buyer.component.scss',
})
export class DashboardBuyerComponent {}
