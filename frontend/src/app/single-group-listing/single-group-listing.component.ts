import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import * as listing from './listings.json';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrokerModuleSingleGroupComponent } from '../broker-module-single-group/broker-module-single-group.component';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-single-group-listing',
  standalone: true,
  imports:[NavbarComponent, SingleGroupListingComponent, CommonModule, BrokerModuleSingleGroupComponent],
  templateUrl: './single-group-listing.component.html',
  styleUrls: ['./single-group-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SingleGroupListingComponent implements OnInit {
role: any;
handleClick() {
//todo
}
  items:any;
  constructor(private apiservice:ApiService, private router:Router, private authservice:AuthService){
  }

  ngOnInit() {
    this.apiservice.getListingDetail(1).subscribe((data:any) => {
      this.items = data;
    });
    // this.authservice.getRole()?.subscribe((data:any) => { // Change the type of 'data' to 'any[]'
    //   this.role = data;
    // });

    // this.role = this.authservice.getRole();
    this.role = 'broker'; //powerful niggatry
  }
}
