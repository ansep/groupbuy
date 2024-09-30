import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GroupsListComponent } from '../groups-list/groups-list.component';

@Component({
  selector: 'app-buyer-joined-listings',
  standalone: true,
  imports: [GroupsListComponent],
  templateUrl: './buyer-joined-listings.component.html',
  styleUrl: './buyer-joined-listings.component.scss',
})
export class BuyerJoinedListingsComponent {
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

  constructor(private apiservice: ApiService) {}
  ngOnInit() {
    this.apiservice.getJoinedGroups().subscribe({
      next: (data: any) => {
        if (data && data.length > 0) {
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
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
