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
        }
      );
    }
  }

  deleteGroupBuy(id: number) {
    return this.https.delete('http://localhost:8080/groupbuy/' + id);
  }

  finalizeGroupBuy(id: number) {
    // TODO: link to right API when available
    return this.https.put(
      'http://localhost:8080/groupbuy/' + id + '/finalize',
      {}
    );
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

  getBrokerGroups(userId: number) {
    return this.https.get(
      'http://localhost:8080/api/user/' + userId + '/ownedGroupbuy'
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

  getJoinedGroups() {
    return this.https.get(
      'http://localhost:8080/api/user/0/subscribedGroupbuy'
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
  getListingDetail(id: number) {
    return this.https.get('http://localhost:8080/api/auth/groupbuy/' + id);
  }

  getListingBroker(id: number) {
    return this.https.get(
      'http://localhost:8080/api/auth/groupbuy/' + id + '/broker'
    );
  }
}
