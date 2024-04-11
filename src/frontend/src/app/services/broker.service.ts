// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  // constructor(private https: HttpClient) {}
  constructor() {}

  login(username: string, password: string) {
    // return this.https.post('http://localhost:3000/login', {
    //   username,
    //   password,
    // });
    return { loggedin: true };
  }
}
