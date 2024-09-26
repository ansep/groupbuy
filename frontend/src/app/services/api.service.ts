// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private https: HttpClient) {}
  getOpenGroups() {
    return this.https.get('http://localhost:8080/api/auth/groupbuy');
    // const openGroups = [];

    // for (let i = 0; i < 10; i++) {
    //   const groupBuy = {
    //     id: i,
    //     title: `Group Buy nr  ${i + 1}`,
    //     description: `Description for Group Buy ${
    //       i + 1
    //     }. This is a very long and verbose decription that contains nothing relevant at all. Yeah indeed this piece of text is very long and pretty useless but it's a great way to understand how bad frontend can go I guess.`,
    //     subscribedPeople: Math.floor(Math.random() * 500),
    //     requiredPeople: Math.floor(Math.random() * 5000) + 100,
    //     unitPrice: parseFloat((Math.random() * 100).toFixed(1)),
    //     brokerName: `Broker ${i + 1}`,
    //     image:
    //       'https://media-assets.wired.it/photos/64f5bd6bcceb534d9f169474/16:9/w_1888,h_1062,c_limit/notebook%20da%20gaming.jpg',
    //     location: `Location ${i + 1}`,
    //   };
    //   openGroups.push(groupBuy);
    // }

    // return openGroups;
  }

  getParticipants(): any {
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

  addNewGroupBuy(
    title: string,
    price: number,
    availablePieces: number,
    category: string,
    location: string,
    description: string
  ) {
    {
      //TOCHECK THE POST
      return this.https.post(
        'http://localhost:8080/groupbuy',

        {
          description,
          cost: price,
          category,
          maxSize: availablePieces,
          product: title,
          status: 'OPEN',
          location,
          // title,
          // price,
          // minQuantity,
          // availablePieces,
          // category,
        }
      );
    }
  }

  uploadGroupBuyImage(id: number, image: string) {
    const formData = new FormData();
    formData.append('file', image);
    formData.append('id', id.toString());
    return this.https.post(
      'http://localhost:8080/groupbuy/' + id + '/picture',
      formData
    );
  }

  getSubscribersCount(id: number) {
    return this.https.get(
      'http://localhost:8080/groupbuy/' + id + '/subscriptions'
    );
  }

  getSubscribersList(id: number) {
    return this.https.get(
      'http://localhost:8080/groupbuy/' + id + '/subscription'
    );
  }

  joinGroupBuy(id: number) {
    return this.https.post(
      'http://localhost:8080/groupbuy/' + id + '/subscription',
      {}
    );
  }

  leaveGroupBuy(id: number) {
    return this.https.delete(
      'http://localhost:8080/groupbuy/' + id + '/subscription'
    );
  }

  hasCurrentBuyerJoinedGroup(id: number) {
    return this.https.get(
      'http://localhost:8080/groupbuy/' + id + '/subscription'
    );
  }

  retrieveMessageHistory(username: string) {
    return this.https.get('http://localhost:8080/chat/messages/' + username);
  }

  async getMessages(): Promise<any[]> {
    const messages = [];

    for (let i = 0; i < 10; i++) {
      let body = await fetch(
        'https://jsonplaceholder.typicode.com/posts/' + (i + 1) + '/comments'
      );
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
  titles = [
    'Bulk buy of microcontrollers',
    'Bulk buy of resistors',
    'Bulk buy of capacitors',
  ];
  locations = [
    'Rome (Italy)',
    'Milan (Italy)',
    'Turin (Italy)',
    'Favazzina(Italy)',
    'New York (USA)',
    'Los Angeles (USA)',
    'San Francisco (USA)',
    'Tokyo (Japan)',
    'Osaka (Japan)',
    'Kyoto (Japan)',
    'Barcellona Pozzo di Gotto (Italy)',
  ];
  names = [
    'Mario Rossi',
    'Luca Verdi',
    'Gustavo Cerveza',
    'John Smith',
    'Annunziato Romeo',
    'Bartolo Morabito',
    'Gianalbertommanlio Foti',
  ];
  getListingDetail(id: string) {
    return this.https.get('http://localhost:8080/api/auth/groupbuy/' + id);
  }

  // getGroup(id:any){
  //   return this.getOpenGroups.
  // }
}
