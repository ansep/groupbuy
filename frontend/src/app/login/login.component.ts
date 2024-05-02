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
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
      this.authService.login(username, password).subscribe({
        next: (data: any) => {
          console.log(data);
          const role = data.roles[0] === 'ROLE_BROKER' ? 'broker' : 'buyer';
          this.authService.setLoggedIn(
            data.accessToken,
            data.username,
            role,
            data.id,
            data.email
          );
          this.router.navigate(['/' + role + '/home']);
        },
        error: (error) => {
          this.incorrect = true;
        },
      });
    }
  }
}
