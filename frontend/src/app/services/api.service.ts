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

  editGroupBuy(
    id: number,
    title: string,
    price: number,
    availablePieces: number,
    category: string,
    location: string,
    description: string
  ) {
    return this.https.patch('http://localhost:8080/groupbuy/' + id, {
      description,
      cost: price,
      category,
      maxSize: availablePieces,
      product: title,
      status: 'OPEN',
      location,
    });
  }

  deleteGroupBuy(id: number) {
    return this.https.delete('http://localhost:8080/groupbuy/' + id);
  }

  finalizeGroupBuy(id: number) {
    return this.https.post(
      'http://localhost:8080/groupbuy/' + id + '/close',
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
