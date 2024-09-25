import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GroupsListComponent } from '../groups-list/groups-list.component';

@Component({
  selector: 'app-open-groups-list',
  standalone: true,
  imports: [GroupsListComponent],
  templateUrl: './open-groups-list.component.html',
  styleUrl: './open-groups-list.component.scss',
})
export class OpenGroupsListComponent {
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
  }[] = [];

  constructor(private apiservice: ApiService) {}
  ngOnInit() {
    // this.items = this.apiservice.getOpenGroups();
    this.apiservice.getOpenGroups().subscribe((data: any) => {
      if (
        data['_embedded'] &&
        data['_embedded'].groupBuys &&
        data['_embedded'].groupBuys.length > 0
      ) {
        this.items = data['_embedded'].groupBuys.map((groupBuy: any) => {
          return {
            id: groupBuy._links.self[0].href.split('/').pop(),
            title: groupBuy.product,
            unitPrice: groupBuy.cost,
            availablePieces: groupBuy.maxSize,
            category: groupBuy.category,
            location: groupBuy.location,
            image: groupBuy.postingPicturePath,
            //TODO: Add description different from title, subscribedPeople when implemented in API
            description: groupBuy.description,
            subscribedPeople: 50,
          };
        });
      }
    });
  }
}
