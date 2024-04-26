import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
    username: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private brokerService: BrokerService) {}

  login() {
    // console.log('Username:', this.loginBrokerForm.value.username);
    // console.log('Password:', this.loginBrokerForm.value.password);
    this.brokerService
      .login(
        this.loginBrokerForm.value.username || 'ciao',
        this.loginBrokerForm.value.password || 'ciao'
      )
      .subscribe((data) => {
        console.log(data);
      });
  }
}
