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
  selector: 'app-login-buyer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-buyer.component.html',
  styleUrl: './login-buyer.component.scss',
})
export class LoginBuyerComponent {
  loginBuyerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted = false;
  incorrect = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.incorrect = false;
    this.submitted = true;
    const username = this.loginBuyerForm.value.username;
    const password = this.loginBuyerForm.value.password;
    if (this.loginBuyerForm.valid && username && password) {
      this.authService
        .login(username, password, 'buyer')
        .subscribe((data: any) => {
          if (data.success) {
            this.authService.setLoggedIn(data.token, username, 'buyer');
            this.router.navigate(['/buyer/home']);
          } else {
            this.incorrect = true;
          }
        });
    }
  }
}
