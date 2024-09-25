import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groups-list',
  standalone: true,
  imports: [ReactiveFormsModule],
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
  displayedGroups: {
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
  searchForm = new FormGroup({
    search: new FormControl(null),
  });
  placeHolderImage = 'assets/no-image-available.png';

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groups']) {
      this.displayedGroups = this.groups;
    }
  }
  ngAfterViewInit() {
    this.searchForm.get('search')?.valueChanges.subscribe((searchTerm) => {
      this.filterGroups(searchTerm);
    });
  }

  // Function to load the product details page
  openGroupBuy(id: number) {
    this.router.navigate([localStorage.getItem('role'), 'group', id]);
  }

  filterGroups(term: string | null) {
    if (!term) {
      this.displayedGroups = this.groups;
      return;
    }
    this.displayedGroups = this.groups.filter((group: any) => {
      return (
        group.title.toLowerCase().includes(term.toLowerCase()) ||
        group.description.toLowerCase().includes(term.toLowerCase())
      );
    });
  }
}
