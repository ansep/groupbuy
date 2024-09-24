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
            image: groupBuy.postingPicturePath,
            //TODO: Add real description, subscribedPeople, requiredPeople when implemented in API
            description:
              'This is a description of the product that is being sold in the group buy listing. It is a very long and verbose description that contains nothing relevant at all. Yeah indeed this piece of text is very long and pretty useless but it is a great way to understand how bad frontend can go I guess.',
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
