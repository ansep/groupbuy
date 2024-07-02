import { Component } from '@angular/core';
import { NavbarBrokerComponent } from "../navbar-broker/navbar-broker.component";
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { ngbRunTransition } from '@ng-bootstrap/ng-bootstrap/util/transition/ngbTransition';

@Component({
    selector: 'app-broker-new-listing',
    standalone: true,
    templateUrl: './broker-new-listing.component.html',
    styleUrl: './broker-new-listing.component.scss',
    imports: [NavbarBrokerComponent, NavbarBrokerComponent]
})


export class BrokerNewListingComponent {

  signupForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    minQuantity: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    availablePieces: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });;

  submitted = false;
  incorrect = false;
  errorMessage: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {}
  sendNewListing() {
    console.log("clicked!!");
    this.incorrect = false;
    this.errorMessage = null;
    this.submitted = true;
    if (
      this.signupForm.valid &&
      this.signupForm.value.title &&
      this.signupForm.value.description &&
      this.signupForm.value.price &&
      this.signupForm.value.minQuantity &&
      this.signupForm.value.category &&
      this.signupForm.value.image
    ) {
      this.apiService
        .addNewGroupBuy(
          this.signupForm.value.title,
          Number(this.signupForm.value.price), // Convert the value to a number
          Number(this.signupForm.value.minQuantity),
          Number(this.signupForm.value.availablePieces),
          this.signupForm.value.category,
          this.signupForm.value.image)
        .subscribe({ //this whole part might be wrong AF
          next: (data: any) => {
            this.router.navigate(['/broker'], {
              queryParams: { registered: 'true' },
            });
          },
          error: (error) => {
            if (error.status === 400) {
              this.errorMessage = error.error.message;
            } else if (error.status === 401) {
              this.incorrect = true;
            } else {
              this.incorrect = true;
            }
          },
        });
    }
  }
}


