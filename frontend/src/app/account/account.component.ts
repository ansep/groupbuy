import { Component, ElementRef, ViewChild } from '@angular/core';
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
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    profilePicturePath: string;
  } = {
    id: 0,
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    telephoneNumber: '',
    profilePicturePath: '',
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
  @ViewChild('closeDeleteModal') closeDeleteModal: ElementRef | undefined;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserInfo(authService.getUserId()).subscribe({
      next: (user: any) => {
        this.oldUserInfo = user;
        this.editAccountForm.patchValue({
          username: this.oldUserInfo.username,
          email: this.oldUserInfo.email,
          role: authService.getRole(),
          firstName: this.oldUserInfo.firstName,
          lastName: this.oldUserInfo.lastName,
          telephoneNumber: this.oldUserInfo.telephoneNumber,
          image: this.oldUserInfo.profilePicturePath,
        });
        if (user.profilePicturePath) {
          this.imagePreview =
            `http://localhost:8080/api/user/${user.id}/picture?t=` +
            new Date().getTime();
        }
      },
      error: (err) => {
        console.error(err);
      },
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
        if (
          this.editAccountForm.value.image &&
          this.editAccountForm.value.image !==
            this.oldUserInfo.profilePicturePath
        ) {
          this.authService
            .uploadUserImage(this.editAccountForm.value.image)
            .subscribe({
              next: (imageData: any) => {
                this.router
                  .navigate(
                    [
                      this.authService.getRole(),
                      'profile',
                      this.oldUserInfo.username,
                    ],
                    {
                      queryParams: { edited: 'true' },
                    }
                  )
                  .then(() => window.location.reload());
              },
              error: (error) => {
                console.error('Error uploading image:', error);
              },
            });
        } else {
          this.router.navigate(
            [this.authService.getRole(), 'profile', this.oldUserInfo.username],
            {
              queryParams: { edited: 'true' },
            }
          );
        }
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

  deleteAccount() {
    // TODO: Connect delete user API
    this.authService.deleteUser().subscribe({
      next: (response) => {
        this.closeDeleteModal?.nativeElement.click();
        this.authService.logout();
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
