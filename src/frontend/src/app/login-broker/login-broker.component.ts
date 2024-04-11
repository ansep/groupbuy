import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrokerService } from '../services/broker.service';

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

  constructor(private brokerService: BrokerService) {}

  login() {
    this.incorrect = false;
    this.submitted = true;
    if (
      this.loginBrokerForm.valid &&
      this.loginBrokerForm.value.username &&
      this.loginBrokerForm.value.password
    ) {
      this.brokerService
        .login(
          this.loginBrokerForm.value.username,
          this.loginBrokerForm.value.password
        )
        .subscribe((data: any) => {
          console.log(data);
          if (data.success) {
            console.log('logged in');
          } else {
            console.log(' not logged in');
            this.incorrect = true;
          }
        });
    }
  }
}
