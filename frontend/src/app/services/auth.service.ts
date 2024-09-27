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

  getRole(): 'broker' | 'buyer' | null {
    const role = localStorage.getItem('role');
    if (role === 'broker') {
      return 'broker';
    } else if (role === 'buyer') {
      return 'buyer';
    } else {
      return null;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUsername() {
    return localStorage.getItem('username');
  }

  getUserInfo() {
    //TODO: connect to API
    return new Observable<any>((observer) => {
      observer.next({
        id: 3,
        username: localStorage.getItem('username'),
        email: localStorage.getItem('email'),
        role: localStorage.getItem('role'),
        firstName: 'John',
        lastName: 'Doe',
        telephoneNumber: '1234567890',
        profile_picture_path: 'ciao.jpg',
      });
    });
  }

  getUserId() {
    return parseInt(localStorage.getItem('id') || '0');
  }

  // TODO: connect user edit to API
  editUser(updatedInfo: {
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
  }) {
    return new Observable((observer) => {
      observer.next({ message: 'User updated' });
    });
  }

  uploadUserImage(image: string) {
    const formData = new FormData();
    formData.append('file', image);
    return this.https.post('http://localhost:8080/api/user/picture', formData);
  }
}
