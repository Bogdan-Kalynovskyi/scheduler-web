import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {environment} from '../../environments/environment';
import User from '../models/user';
import {SocialUser} from 'angular4-social-login';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  authenticate(user: SocialUser): Promise<User | null> {
    return this.http.post(environment.apiUrl + '/authenticate', user)
      .toPromise()
      .then((response: HttpResponse<any>) => this.saveUserLocally(response.body));
      // .catch(() => alert('401')); // todo
  }

  isAuthenticated(): User | null {
    const user = this.getLocallySavedUser();
    if (user && user.expires < Date.now()) {
      // this.logout();
      return user;
    }

    return null;
  }

  private saveUserLocally(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  }

  private forgetUserLocally() {
    localStorage.removeItem('user');
  }

  getLocallySavedUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.forgetUserLocally();
    location.reload();
  }
}