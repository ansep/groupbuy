import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrokerModuleSingleGroupComponent } from '../broker-module-single-group/broker-module-single-group.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-single-group-listing',
  standalone: true,
  imports: [
    SingleGroupListingComponent,
    CommonModule,
    BrokerModuleSingleGroupComponent,
  ],
  templateUrl: './single-group-listing.component.html',
  styleUrls: ['./single-group-listing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SingleGroupListingComponent implements OnInit {
  item: {
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
  } | null = null;
  role: string | null = null;
  placeholderImage = 'assets/no-image-available.png';

  constructor(
    private apiservice: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    const groupId = this.route.snapshot.params['id'];

    this.apiservice.getListingDetail(groupId).subscribe({
      next: (response: any) => {
        this.item = {
          id: response.id,
          title: response.description, //TODO: title,
          unitPrice: response.cost,
          product: response.product,
          availablePieces: response.maxSize,
          category: response.category,
          location: response.location,
          image: response.postingPicturePath,
          description: response.description,
          subscribedPeople: 0,
        };
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.error(error);
      },
    });
  }
}
