// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
structor() { }
constructor(private https: HttpClient) {}
  getOpenGroups() {
    const openGroups = [];

    for (let i = 0; i < 10; i++) {
      const groupBuy = {
        id: i,
        title: `Group Buy nr  ${i + 1}`,
        description: `Description for Group Buy ${i + 1}. This is a very long and verbose decription that contains nothing relevant at all. Yeah indeed this piece of text is very long and pretty useless but it's a great way to understand how bad frontend can go I guess.`,
        subscribedPeople: Math.floor(Math.random() * 500),
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

  getParticipants():any {
    const participants = [];

    for (let i = 0; i < 100; i++) {
      const participant = {
        id: i,
        name: `name ${i}`,
        email: `participant${i}@mail.it`,
        surname: `surname ${i}`,
        username: `username ${i}`,
        phoneNumber: `telephoneNumber ${i}`,
      };
      participants.push(participant);

    }
    return participants;



  }

  addNewGroupBuy(title: string, price: number, minQuantity: number, availablePieces: number, category:string, image:string) { //what about user id????
    { //TOCHECK THE POST
      return this.https.post('http://localhost:8080/api/broker/new',  {
        title,
        price,
        minQuantity,
        availablePieces,
        category,
        image,

      });
  }
}

  async getMessages(): Promise<any[]> {
    const messages = [];

    for (let i = 0; i < 10; i++) {
     let body = (await fetch('https://jsonplaceholder.typicode.com/posts/'+(i+1)+'/comments'));
     const comments = await body.json();
     comments.map((item: any) => item.name); //useless, just to show how to use
      const message = {
        id: i,
        sender: `sender ${i}`,
        receiver: `receiver ${i}`,
        data: comments.map((item: any) => item.name),
        date: `date ${i}`,
      };
      messages.push(message);
    }

    return messages;
  }

  // some titles for the bulk buying microelectronics
  titles = ['Bulk buy of microcontrollers', 'Bulk buy of resistors', 'Bulk buy of capacitors'];
  locations = ['Rome (Italy)', 'Milan (Italy)', 'Turin (Italy)', 'Favazzina(Italy)', 'New York (USA)', 'Los Angeles (USA)', 'San Francisco (USA)', 'Tokyo (Japan)', 'Osaka (Japan)', 'Kyoto (Japan)', 'Barcellona Pozzo di Gotto (Italy)'];
  names = ['Mario Rossi','Luca Verdi','Gustavo Cerveza','John Smith','Annunziato Romeo','Bartolo Morabito','Gianalbertommanlio Foti'];
  getListingDetail(id: any) :any  { //parameter id is not used rn
    const listingDetail = {
      id: 1,
      title: this.titles[Math.floor(Math.random() * 3) + 1],
      description: 'Description for this group Buy. This is a very long and verbose decription that contains nothing relevant at all. Yeah indeed this piece of text is very long and pretty useless but it\'s a great way to understand how bad frontend can go I guess.',
      //subscribed are random number within the maximum required people
      subscribedPeople: Math.floor(Math.random() * 1000),
      requiredPeople: 1000,
      unitPrice: Math.floor(Math.random() * 400) + 12,
      brokerName: this.names[Math.floor(Math.random() * 6) ],
      image: 'https://media-assets.wired.it/photos/64f5bd6bcceb534d9f169474/16:9/w_1888,h_1062,c_limit/notebook%20da%20gaming.jpg',
      location: this.locations[Math.floor(Math.random() * 11) ]
    };

    return new Observable((observer) => {
      observer.next(listingDetail);
      observer.complete();
    });
  }

  // getGroup(id:any){
  //   return this.getOpenGroups.
  // }
}


