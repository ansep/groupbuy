import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GroupsListComponent } from '../groups-list/groups-list.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-broker-my-groups',
  standalone: true,
  imports: [GroupsListComponent],
  templateUrl: './broker-my-groups.component.html',
  styleUrl: './broker-my-groups.component.scss',
})
export class BrokerMyGroupsComponent {
  items: {
    id: number;
    title: string;
    unitPrice: number;
    availablePieces: number;
    category: string;
    location: string;
    image: string;
    description: string;
    subscribedPeople: number;
    status: string;
  }[] = [];

  constructor(
    private apiservice: ApiService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    const brokerId = this.authService.getUserId();
    this.apiservice.getBrokerGroups(brokerId).subscribe((data: any) => {
      this.items = data.map((groupBuy: any) => {
        return {
          id: groupBuy.id,
          title: groupBuy.product,
          unitPrice: groupBuy.cost,
          availablePieces: groupBuy.maxSize,
          category: groupBuy.category,
          location: groupBuy.location,
          image: groupBuy.postingPicturePath,
          description: groupBuy.description,
          subscribedPeople: 0,
          status: groupBuy.status,
        };
      });
    });
  }
}
