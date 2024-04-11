// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  // constructor(private https: HttpClient) {}
  constructor() {}

  // login(username: string, password: string) {
  //   // return this.https.post('http://localhost:3000/login', {
  //   //   username,
  //   //   password,
  //   // });
  // }

  // simulate http response to subscribe to
  login(username: string, password: string) {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({ success: false });
      }, 100);
    });
  }
}
