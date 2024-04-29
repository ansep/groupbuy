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
  selector: 'app-login-broker',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-broker.component.html',
  styleUrl: './login-broker.component.scss',
})
export class LoginBrokerComponent {
  loginBrokerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted = false;
  incorrect = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.incorrect = false;
    this.submitted = true;
    const username = this.loginBrokerForm.value.username;
    const password = this.loginBrokerForm.value.password;
    if (this.loginBrokerForm.valid && username && password) {
      this.authService
        .login(username, password, 'broker')
        .subscribe((data: any) => {
          if (data.success) {
            this.authService.setLoggedIn(data.token, username, 'broker');
            this.router.navigate(['/broker/home']);
          } else {
            this.incorrect = true;
          }
        });
    }
  }
}
