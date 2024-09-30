import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-edit-listing',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './broker-edit-listing.component.html',
  styleUrl: './broker-edit-listing.component.scss',
})
export class BrokerEditListingComponent {
  oldItem: {
    id: number;
    title: string;
    unitPrice: number;
    availablePieces: number;
    category: string;
    location: string;
    image: string | null;
    description: string;
  } | null = null;
  editListingForm = new FormGroup({
    title: new FormControl('', Validators.required),
    image: new FormControl(''), // Validators.required),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(2000),
    ]),
    category: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    availablePieces: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
    location: new FormControl('', Validators.required),
  });

  submitted = false;
  incorrect = false;
  errorMessage: string | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  groupId: number = 0;

  constructor(private apiService: ApiService, private router: Router) {
    const id = this.router.url.split('/').pop();
    if (id && !isNaN(+id) && +id > 0) {
      this.groupId = +id;
    } else {
      this.router.navigate(['/broker']);
      return;
    }

    this.apiService.getListingDetail(this.groupId).subscribe({
      next: (data: any) => {
        this.oldItem = {
          id: this.groupId,
          title: data.product,
          unitPrice: data.cost,
          availablePieces: data.maxSize,
          category: data.category,
          location: data.location,
          image: data.postingPicturePath
            ? 'http://localhost:8080/groupbuy/' +
              this.groupId +
              '/picture?t=' +
              new Date().getTime()
            : null,
          description: data.description,
        };
        this.editListingForm.patchValue({
          title: data.product,
          description: data.description,
          price: data.cost,
          category: data.category,
          location: data.location,
          availablePieces: data.maxSize,
        });
        if (this.oldItem.image) {
          this.imagePreview = this.oldItem.image;
        }
      },
      error: (error) => {
        console.error('Error getting listing:', error);
      },
    });
  }

  editListing() {
    this.incorrect = false;
    this.errorMessage = null;
    this.submitted = true;
    if (
      this.editListingForm.valid &&
      this.editListingForm.value.title &&
      this.editListingForm.value.description &&
      this.editListingForm.value.price &&
      this.editListingForm.value.category &&
      this.editListingForm.value.availablePieces &&
      this.editListingForm.value.category &&
      this.editListingForm.value.location
    ) {
      this.apiService
        .editGroupBuy(
          this.groupId,
          this.editListingForm.value.title,
          Number(this.editListingForm.value.price),
          Number(this.editListingForm.value.availablePieces),
          this.editListingForm.value.category,
          this.editListingForm.value.location,
          this.editListingForm.value.description
        )
        .subscribe({
          next: (data: any) => {
            if (this.editListingForm.value.image) {
              this.apiService
                .uploadGroupBuyImage(
                  this.groupId,
                  this.editListingForm.value.image
                )
                .subscribe({
                  next: (data2: any) => {
                    console.log('Image uploaded:', data2);
                  },
                  error: (error) => {
                    console.error('Error uploading image:', error);
                  },
                  complete: () => {
                    this.router.navigate(['/broker/group/' + this.groupId], {
                      queryParams: { edited: 'true' },
                    });
                  },
                });
            } else {
              this.router.navigate(['/broker/group/' + this.groupId], {
                queryParams: { edited: 'true' },
              });
            }
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

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editListingForm.patchValue({
        image: file,
      });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
      };
      try {
        reader.readAsDataURL(file);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    }
  }
}
