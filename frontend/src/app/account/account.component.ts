import { Component } from '@angular/core';
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
    username: string;
    email: string;
    role: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
  } = {
    username: '',
    email: '',
    role: '',
    firstName: '',
    lastName: '',
    telephoneNumber: '',
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
  });
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
      });
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
    this.authService
      .editUser(
        this.editAccountForm.value.password || '',
        this.editAccountForm.value.email || '',
        this.editAccountForm.value.firstName || '',
        this.editAccountForm.value.lastName || '',
        this.editAccountForm.value.telephoneNumber || ''
      )
      .subscribe({
        next: (data: any) => {
          // TODO: Redirect to the correct profile page
          // this.router.navigate(['/profile/usename'], {
          //   queryParams: { edited: 'true' },
          // });
          this.router.navigate([this.oldUserInfo.role + '/account'], {
            queryParams: { edited: 'true' },
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
