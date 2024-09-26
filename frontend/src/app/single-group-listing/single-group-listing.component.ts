import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrokerModuleSingleGroupComponent } from '../broker-module-single-group/broker-module-single-group.component';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
@Component({
  selector: 'app-single-group-listing',
  standalone: true,
  imports: [
    SingleGroupListingComponent,
    CommonModule,
    BrokerModuleSingleGroupComponent,
    NavbarComponent,
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
    availablePieces: number;
    category: string;
    location: string;
    image: string;
    description: string;
    subscribedPeople: number;
  } | null = null;
  role: 'broker' | 'buyer' | null = null;
  placeholderImage = 'assets/no-image-available.png';
  isOwner: boolean = false;
  joined: boolean = false;
  addedToWishlist: boolean = false;

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
          title: response.product,
          unitPrice: response.cost,
          availablePieces: response.maxSize,
          category: response.category,
          location: response.location,
          image: response.postingPicturePath
            ? 'http://localhost:8080/groupbuy/' + groupId + '/picture'
            : this.placeholderImage,
          description: response.description,
          subscribedPeople: 0,
        };

        this.apiservice.getSubscribersCount(groupId).subscribe({
          next: (response: any) => {
            console.log(response);
            if (this.item) this.item.subscribedPeople = response;
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['login']);
            }
            console.error(error);
          },
        });

        if (this.role === 'broker') {
          //If receive correct response, broker is owner, else if status is 400 then not owner
          this.apiservice.getSubscribersList(groupId).subscribe({
            next: (response: any) => {
              console.log(response);
              // TODO: pass the subscribers list to the broker module child component
              this.isOwner = true;
            },
            error: (error) => {
              if (error.status === 401) {
                this.router.navigate(['login']);
              }
              console.error(error);
            },
          });
        } else if (this.role === 'buyer') {
          this.apiservice.hasCurrentBuyerJoinedGroup(groupId).subscribe({
            next: (response: any) => {
              console.log(response);
              this.joined = true;
            },
            error: (error) => {
              if (error.status === 401) {
                this.router.navigate(['login']);
              }
              console.error(error);
            },
          });
        }
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.error(error);
      },
    });
  }

  joinGroupBuy(id: number) {
    this.apiservice.joinGroupBuy(id).subscribe({
      next: (response: any) => {
        console.log(response);
        //TODO: edit the join button to joined/leave button
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.error(error);
      },
    });
  }

  leaveGroupBuy(id: number) {
    this.apiservice.leaveGroupBuy(id).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.error(error);
      },
    });
  }

  manageGroupBuy(id: number) {
    // TODO: edit page for broker to manage group buy
  }
}
