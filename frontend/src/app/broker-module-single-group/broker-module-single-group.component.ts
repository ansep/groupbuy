import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-broker-module-single-group',
  standalone: true,
  imports: [],
  templateUrl: './broker-module-single-group.component.html',
  styleUrl: './broker-module-single-group.component.scss'
})
export class BrokerModuleSingleGroupComponent {
  participants:any[] = []
  constructor(private apiservice:ApiService, private router:Router){
  }
  ngOnInit(){
    this.participants = this.apiservice.getParticipants();
    console.log(this.participants);
  }
}
