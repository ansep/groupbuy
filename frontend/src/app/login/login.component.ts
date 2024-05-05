import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  submitted = false;
  incorrect = false;
  registered: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/' + this.authService.getRole() + '/home']);
    }
    this.route.queryParams.subscribe((params) => {
      if (params['registered'] === 'true') {
        this.registered = true;
      }
    });
  }

  login() {
    this.incorrect = false;
    this.submitted = true;
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    if (this.loginForm.valid && username && password) {
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
