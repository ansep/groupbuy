import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-module-single-group',
  standalone: true,
  imports: [],
  templateUrl: './broker-module-single-group.component.html',
  styleUrl: './broker-module-single-group.component.scss',
})
export class BrokerModuleSingleGroupComponent {
  @Input() participants: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
    profilePicturePath: string;
  }[] = [];

  constructor(private router: Router) {}
}
