import { Component } from '@angular/core';
import { NavbarBrokerComponent } from '../navbar-broker/navbar-broker.component';
import { OpenGroupsListComponent } from '../open-groups-list/open-groups-list.component';
import { ActivatedRoute, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-broker',
  standalone: true,
  imports: [NavbarBrokerComponent, RouterOutlet],
  templateUrl: './dashboard-broker.component.html',
  styleUrl: './dashboard-broker.component.scss',
})
export class DashboardBrokerComponent {
  deletedGroupBuy = false;
  constructor(private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      if (params['deleted'] === 'true') {
        this.deletedGroupBuy = true;
      }
    });
  }
}
