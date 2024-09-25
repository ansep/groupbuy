import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-groups-list',
  standalone: true,
  imports: [],
  templateUrl: './open-groups-list.component.html',
  styleUrl: './open-groups-list.component.scss',
})
export class OpenGroupsListComponent {
  placeHolderImage = 'assets/no-image-available.png';
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

  constructor(private apiservice: ApiService, private router: Router) {}
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
            title: groupBuy.description,
            unitPrice: groupBuy.cost,
            product: groupBuy.product,
            availablePieces: groupBuy.maxSize,
            category: groupBuy.category,
            location: groupBuy.location,
            image: groupBuy.postingPicturePath || this.placeHolderImage,
            //TODO: Add description different from title, subscribedPeople, requiredPeople when implemented in API
            description: groupBuy.description,
            subscribedPeople: 50,
            requiredPeople: 1000,
          };
        });
      }
    });
  }

  // Function to load the product details page
  openGroupBuy(id: number) {
    this.router.navigate([localStorage.getItem('role'), 'group', id]);
  }
}
