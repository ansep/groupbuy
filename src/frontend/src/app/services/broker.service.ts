import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrokerService {
  constructor(private https: HttpClient) {}

  login(username: string, password: string) {
    return this.https.post('http://localhost:3000/login', {
      username,
      password,
    });
  }
}
