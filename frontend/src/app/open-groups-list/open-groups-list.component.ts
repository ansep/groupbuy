import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-open-groups-list',
  standalone: true,
  imports: [],
  templateUrl: './open-groups-list.component.html',
  styleUrl: './open-groups-list.component.scss'
})
export class OpenGroupsListComponent {


  items:any[] = []
  constructor(private apiservice:ApiService, private router:Router){
  }
  ngOnInit(){
    this.items = this.apiservice.getOpenGroups()
  }

  loadProduct(arg0: any) {
    this.router.navigate(arg0)
}
}
