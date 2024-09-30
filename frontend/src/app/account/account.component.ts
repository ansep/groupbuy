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
    currentPassword: new FormControl(''),
    newPassword: new FormControl(''),
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

  async edit() {
    this.errorMessage = null;
    this.incorrect = false;
    this.submitted = true;
    if (
      this.editAccountForm.invalid ||
      (this.editAccountForm.value.newPassword &&
        !this.editAccountForm.value.currentPassword) ||
      (this.editAccountForm.value.newPassword &&
        this.editAccountForm.value.newPassword !==
          this.editAccountForm.value.passwordConfirm)
    ) {
      if (!this.editAccountForm.invalid) {
        if (!this.editAccountForm.value.currentPassword) {
          this.errorMessage = 'Current password is required to change password';
        } else {
          this.errorMessage = 'Passwords do not match';
        }
      }
      return;
    }

    try {
      // Step 1: Edit user information
      const newInformation: any = {};
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

      await this.authService.editUser(newInformation).toPromise();

      // Step 2: Update password if needed
      if (this.editAccountForm.value.newPassword) {
        await this.authService
          .updatePassword(
            this.editAccountForm.value.currentPassword || '',
            this.editAccountForm.value.newPassword,
            this.editAccountForm.value.passwordConfirm || ''
          )
          .toPromise();
      }

      // Step 3: Upload new image if needed
      if (
        this.editAccountForm.value.image &&
        this.editAccountForm.value.image !== this.oldUserInfo.profilePicturePath
      ) {
        await this.authService
          .uploadUserImage(this.editAccountForm.value.image)
          .toPromise();
      }

      // All operations completed successfully, now redirect
      this.router.navigate(
        [this.authService.getRole(), 'profile', this.oldUserInfo.username],
        {
          queryParams: { edited: 'true', reload: 'true' },
        }
      );
    } catch (error: any) {
      console.error('Error updating account:', error);
      if (error.status === 400) {
        this.errorMessage = error.error.message;
      } else if (error.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.incorrect = true;
      }
    }
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
