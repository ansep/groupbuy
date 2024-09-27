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
  brokerName: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.role = this.authService.getRole();
    const groupId = this.route.snapshot.params['id'];

    this.apiService.getListingDetail(groupId).subscribe({
      next: (response: any) => {
        this.item = {
          id: groupId,
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

        this.apiService.getSubscribersCount(groupId).subscribe({
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

        this.apiService.getListingBroker(groupId).subscribe({
          next: (response: any) => {
            this.brokerName = response.username;
          },
          error: (error) => {
            console.error(error);
          },
        });

        if (this.role === 'broker') {
          //If receive correct response, broker is owner, else if status is 400 then not owner
          this.apiService.getSubscribersList(groupId).subscribe({
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
          this.apiService.getJoinedGroups().subscribe({
            next: (response: any) => {
              if (response && response.length > 0) {
                this.joined = response.some((item: any) => item.id == groupId);
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
    this.apiService.joinGroupBuy(id).subscribe({
      next: (response: any) => {
        this.joined = true;
        this.apiService.getSubscribersCount(id).subscribe({
          next: (response: any) => {
            if (this.item) this.item.subscribedPeople = response;
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['login']);
            }
            console.error(error);
          },
        });
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
    this.apiService.leaveGroupBuy(id).subscribe({
      next: (response: any) => {
        this.joined = false;
        this.apiService.getSubscribersCount(id).subscribe({
          next: (response: any) => {
            if (this.item) this.item.subscribedPeople = response;
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['login']);
            }
            console.error(error);
          },
        });
      },
      error: (error) => {
        if (error.status === 401) {
          this.router.navigate(['login']);
        }
        console.error(error);
      },
    });
  }

  openBrokerProfile(brokerName: string) {
    this.router.navigate([this.authService.getRole(), 'profile', brokerName]);
  }

  manageGroupBuy(id: number) {
    // TODO: edit page for broker to manage group buy
  }
}
