import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private https: HttpClient) {}

  login(username: string, password: string) {
    return this.https.post('http://localhost:8080/api/auth/signin', {
      username,
      password,
    });
  }

  // simulate http response to subscribe to
  // login(username: string, password: string) {
  //   return new Observable((observer) => {
  //     setTimeout(() => {
  //       observer.next({ success: true });
  //     }, 100);
  //   });
  // }

  setLoggedIn(
    token: string,
    username: string,
    role: 'broker' | 'buyer',
    id: number,
    email: string
  ) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('username', username);
    localStorage.setItem('id', id.toString());
    localStorage.setItem('email', email);
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
