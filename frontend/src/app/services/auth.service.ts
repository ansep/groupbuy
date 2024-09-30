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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('id');
    localStorage.removeItem('email');
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

  getUserInfo(id: number) {
    return this.https.get('http://localhost:8080/api/user/' + id);
  }

  getUserInfoByUsername(username: string) {
    return this.https.get('http://localhost:8080/api/user/byname/' + username);
  }

  getUserId() {
    return parseInt(localStorage.getItem('id') || '0');
  }

  editUser(updatedInfo: {
    email: string;
    firstName: string;
    lastName: string;
    telephoneNumber: string;
  }) {
    return this.https.patch('http://localhost:8080/api/user', updatedInfo);
  }

  updatePassword(
    currentPassword: string,
    newPassword: string,
    passwordConfirm: string
  ) {
    return this.https.put('http://localhost:8080/api/user/password', {
      currentPassword,
      newPassword,
      confirmPassword: passwordConfirm,
    });
  }

  uploadUserImage(image: string) {
    const formData = new FormData();
    formData.append('file', image);
    return this.https.post('http://localhost:8080/api/user/picture', formData);
  }

  deleteUser() {
    return this.https.delete('http://localhost:8080/api/user');
  }
}
