import { ChangeDetectorRef, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent {
  oldUserInfo: {
    id: number;
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    profile_picture_path: string;
  } = {
    id: 0,
    username: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    profile_picture_path: '',
  };
  editAccountForm = new FormGroup({
    username: new FormControl({ value: '', disabled: true }),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    email: new FormControl('', Validators.email),
    role: new FormControl({ value: '', disabled: true }),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    telephoneNumber: new FormControl('', Validators.pattern('^[0-9]*$')),
    image: new FormControl(''),
  });
  imagePreview: string | ArrayBuffer | null = 'assets/default-avatar-lg.png';
  submitted = false;
  incorrect = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserInfo().subscribe((user) => {
      this.oldUserInfo = user;
      this.editAccountForm.patchValue({
        username: this.oldUserInfo.username,
        email: this.oldUserInfo.email,
        role: this.oldUserInfo.role,
        firstName: this.oldUserInfo.firstName,
        lastName: this.oldUserInfo.lastName,
        telephoneNumber: this.oldUserInfo.telephoneNumber,
        image: this.oldUserInfo.profile_picture_path,
      });
      if (user.profile_picture_path) {
        this.imagePreview = `http://localhost:8080/api/user/${user.id}/picture`;
      }
    });
  }

  edit() {
    this.errorMessage = null;
    this.incorrect = false;
    this.submitted = true;
    if (
      this.editAccountForm.invalid ||
      (this.editAccountForm.value.password &&
        this.editAccountForm.value.password !==
          this.editAccountForm.value.passwordConfirm)
    ) {
      if (!this.editAccountForm.invalid) {
        this.errorMessage = 'Passwords do not match';
      }
      return;
    }
    const newInformation: any = {};
    if (this.editAccountForm.value.password) {
      newInformation.password = this.editAccountForm.value.password;
    }
    if (this.editAccountForm.value.email) {
      newInformation.email = this.editAccountForm.value.email;
    }
    if (this.editAccountForm.value.firstName) {
      newInformation.firstName = this.editAccountForm.value.firstName;
    }
    if (this.editAccountForm.value.lastName) {
      newInformation.lastName = this.editAccountForm.value.lastName;
    }
    if (this.editAccountForm.value.telephoneNumber) {
      newInformation.telephoneNumber =
        this.editAccountForm.value.telephoneNumber;
    }
    this.authService.editUser(newInformation).subscribe({
      next: (data: any) => {
        if (this.editAccountForm.value.image) {
          this.authService
            .uploadUserImage(this.editAccountForm.value.image)
            .subscribe({
              next: (imageData: any) => {},
              error: (error) => {
                console.error('Error uploading image:', error);
              },
            });
        }
        // TODO: Show message on profile page when user is edited
        this.router.navigate(
          [this.oldUserInfo.role, 'profile', this.oldUserInfo.username],
          {
            queryParams: { edited: 'true' },
          }
        );
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = error.error.message;
        } else if (error.status === 401) {
          this.router.navigate(['/login']);
        } else {
          this.incorrect = true;
        }
      },
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.editAccountForm.patchValue({
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
