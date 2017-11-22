import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()

export class UserService {

  constructor(private http: HttpClient) {}

  authenticate(user) {
    return this.http.post(environment.authUrl + '/authenticate', user);
  }

  isAuthenticated() {
    const user = this.getUser();
    if (user) {
      const tokenExp = user.expires;
      if (tokenExp > Date.now()) {
        this.logout();
        return false;
      }

      return true;
    }
  }

  saveUser (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    localStorage.removeItem('user');
  }
}