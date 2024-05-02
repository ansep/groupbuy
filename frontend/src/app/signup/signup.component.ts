import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    passwordConfirm: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    role: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    telephoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
    ]),
  });
  submitted = false;
  incorrect = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.incorrect = false;
    this.errorMessage = null;
    this.submitted = true;
    if (
      this.signupForm.valid &&
      this.signupForm.value.username &&
      this.signupForm.value.password &&
      this.signupForm.value.passwordConfirm &&
      this.signupForm.value.password ===
        this.signupForm.value.passwordConfirm &&
      this.signupForm.value.email &&
      (this.signupForm.value.role === 'buyer' ||
        this.signupForm.value.role === 'broker') &&
      this.signupForm.value.firstName &&
      this.signupForm.value.lastName &&
      this.signupForm.value.telephoneNumber
    ) {
      this.authService
        .signup(
          this.signupForm.value.username,
          this.signupForm.value.email,
          this.signupForm.value.password,
          this.signupForm.value.firstName,
          this.signupForm.value.lastName,
          this.signupForm.value.telephoneNumber,
          this.signupForm.value.role
        )
        .subscribe({
          next: (data: any) => {
            this.router.navigate(['/login'], {
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
