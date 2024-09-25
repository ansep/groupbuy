import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [],
  templateUrl: './groups-list.component.html',
  styleUrl: './groups-list.component.scss',
})
export class GroupsListComponent {
  @Input() groups: {
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
  placeHolderImage = 'assets/no-image-available.png';

  constructor(private router: Router) {}

  // Function to load the product details page
  openGroupBuy(id: number) {
    this.router.navigate([localStorage.getItem('role'), 'group', id]);
  }
}
