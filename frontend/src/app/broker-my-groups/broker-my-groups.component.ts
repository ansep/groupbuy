import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GroupsListComponent } from '../groups-list/groups-list.component';

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
    product: string;
    availablePieces: number;
    category: string;
    location: string;
    image: string;
    description: string;
    subscribedPeople: number;
    requiredPeople: number;
  }[] = [];

  constructor(private apiservice: ApiService) {}
  ngOnInit() {
    // TODO: edit from getOpenGroups to getBrokerGroups
    this.apiservice.getOpenGroups().subscribe((data: any) => {
      if (
        data['_embedded'] &&
        data['_embedded'].groupBuys &&
        data['_embedded'].groupBuys.length > 0
      ) {
        this.items = data['_embedded'].groupBuys.map((groupBuy: any) => {
          return {
            id: groupBuy._links.self[0].href.split('/').pop(),
            title: groupBuy.description,
            unitPrice: groupBuy.cost,
            product: groupBuy.product,
            availablePieces: groupBuy.maxSize,
            category: groupBuy.category,
            location: groupBuy.location,
            image: groupBuy.postingPicturePath,
            //TODO: Add description different from title, subscribedPeople, requiredPeople when implemented in API
            description: groupBuy.description,
            subscribedPeople: 50,
            requiredPeople: 1000,
          };
        });
      }
    });
  }
}
