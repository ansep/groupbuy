// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // constructor(private https: HttpClient) {}
  constructor() {}

  // login(username: string, password: string) {
  //   // return this.https.post('http://localhost:3000/login', {
  //   //   username,
  //   //   password,
  //   // });
  // }

  // simulate http response to subscribe to
  login(username: string, password: string, role: 'broker' | 'buyer') {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next({ success: true });
      }, 100);
    });
  }

  setLoggedIn(token: string, username: string, role: 'broker' | 'buyer') {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
