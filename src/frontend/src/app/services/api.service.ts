// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() { }

  getOpenGroups() {
    const openGroups = [];

    for (let i = 0; i < 10; i++) {
      const groupBuy = {
        id: i,
        title: `Group Buy nr  ${i + 1}`,
        description: `Description for Group Buy ${i + 1}. This is a very long and verbose decription that contains nothing relevant at all. Yeah indeed this piece of text is very long and pretty useless but it's a great way to understand how bad frontend can go I guess.`,
        subscribedPeople: Math.floor(Math.random() * 500) + 1,
        requiredPeople: Math.floor(Math.random() * 5000) + 100,
        unitPrice: parseFloat((Math.random() * 100).toFixed(1)),
        brokerName: `Broker ${i + 1}`,
        image: 'https://media-assets.wired.it/photos/64f5bd6bcceb534d9f169474/16:9/w_1888,h_1062,c_limit/notebook%20da%20gaming.jpg',
        location: `Location ${i + 1}`
      };
      openGroups.push(groupBuy);
    }

    return openGroups;
  }

  // getGroup(id:any){
  //   return this.getOpenGroups.
  // }
}


