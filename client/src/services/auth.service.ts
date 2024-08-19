import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Method to save token and user details from login
  saveToken(token: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('isLoggedIn', 'true');
  }

  SetRole(role: string) {
    localStorage.setItem('role', role);
  }

  get getRole(): string | null {
    return localStorage.getItem('role');
  }

  SetUsername(username: string) {
    localStorage.setItem('username', username);
  }

  get getUsername(): string | null {
    return localStorage.getItem('username');
  }

  // Method to retrieve login status
  get getLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
  }
}
