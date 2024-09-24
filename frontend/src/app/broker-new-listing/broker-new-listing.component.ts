import { Component } from '@angular/core';
import { NavbarBrokerComponent } from '../navbar-broker/navbar-broker.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ngbRunTransition } from '@ng-bootstrap/ng-bootstrap/util/transition/ngbTransition';

@Component({
  selector: 'app-broker-new-listing',
  standalone: true,
  templateUrl: './broker-new-listing.component.html',
  styleUrl: './broker-new-listing.component.scss',
  imports: [NavbarBrokerComponent, NavbarBrokerComponent, ReactiveFormsModule],
})
export class BrokerNewListingComponent {
  addListingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl(''), // Validators.required),
    description: new FormControl(''), // Validators.required),
    category: new FormControl('default', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    // minQuantity: new FormControl('', [
    //   // Validators.required,
    //   Validators.pattern('^[0-9]*$'),
    // ]),
    availablePieces: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    location: new FormControl('', Validators.required),
    product: new FormControl('', Validators.required),
  });

  submitted = false;
  incorrect = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}
  sendNewListing() {
    this.incorrect = false;
    this.errorMessage = null;
    this.submitted = true;
    if (
      this.addListingForm.valid &&
      this.addListingForm.value.title &&
      this.addListingForm.value.description &&
      this.addListingForm.value.price &&
      // this.addListingForm.value.minQuantity &&
      this.addListingForm.value.category &&
      this.addListingForm.value.image &&
      this.addListingForm.value.availablePieces &&
      this.addListingForm.value.category &&
      this.addListingForm.value.location &&
      this.addListingForm.value.product
    ) {
      this.apiService
        .addNewGroupBuy(
          this.addListingForm.value.title,
          Number(this.addListingForm.value.price), // Convert the value to a number
          this.addListingForm.value.product,
          Number(this.addListingForm.value.availablePieces),
          this.addListingForm.value.category,
          this.addListingForm.value.location,
          this.addListingForm.value.image,
          this.addListingForm.value.description
        )
        .subscribe({
          next: (data: any) => {
            // TODO: Listing created, redirect to listing
            // this.router.navigate(['/broker/group/' + data.id]);
            console.log('Listing created:', data);
          },
          error: (error) => {
            if (error.status === 401) {
              this.router.navigate(['/login']);
            } else {
              this.incorrect = true;
              console.error('Error creating listing:', error);
            }
          },
        });
    }
  }
}
