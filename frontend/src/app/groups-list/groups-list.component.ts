import { Component, Input, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

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
    availablePieces: number;
    category: string;
    location: string;
    image: string;
    description: string;
    subscribedPeople: number;
  }[] = [];
  displayedGroups: {
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
  searchForm = new FormGroup({
    search: new FormControl(null),
  });
  placeholderImage = 'assets/no-image-available.png';

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['groups']) {
      this.groups.forEach((group) => {
        group.image = group.image
          ? 'http://localhost:8080/groupbuy/' + group.id + '/picture'
          : this.placeholderImage;
        this.apiService.getSubscribersCount(group.id).subscribe({
          next: (response: any) => {
            group.subscribedPeople = response;
          },
          error: (error) => {
            console.error(error);
          },
        });
      });
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
    if (!localStorage.getItem('role')) {
      this.router.navigate(['group', id]);
    } else {
      this.router.navigate([localStorage.getItem('role'), 'group', id]);
    }
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
