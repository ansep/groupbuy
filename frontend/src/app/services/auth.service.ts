import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private https: HttpClient) {}

  signup(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    telephoneNumber: string,
    role: string
  ) {
    return this.https.post('http://localhost:8080/api/auth/signup', {
      username,
      email,
      password,
      firstName,
      lastName,
      telephoneNumber,
      role: [role.toUpperCase()],
    });
  }

  login(username: string, password: string) {
    return this.https.post('http://localhost:8080/api/auth/signin', {
      username,
      password,
    });
  }

  resetPassword(email: string) {
    return new Observable((observer) => {
      observer.next({ message: 'Email sent' });
    });
  }

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

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole() {
    return localStorage.getItem('role');
  }

  getUsername() {
    return localStorage.getItem('username');
  }
}
