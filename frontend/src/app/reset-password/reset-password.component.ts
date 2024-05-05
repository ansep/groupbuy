import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  submitted = false;
  confirmed = false;

  constructor(private authService: AuthService) {}

  reset() {
    this.confirmed = false;
    this.submitted = true;
    const email = this.resetForm.value.email;
    if (this.resetForm.valid && email) {
      this.authService.resetPassword(email).subscribe({
        next: (data: any) => {
          this.confirmed = true;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
