import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {environment} from '../../environments/environment';
import User from '../models/user';
import {SocialUser} from 'angular4-social-login';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  saveTokenToDb(socialUser: SocialUser): Promise<any> {
    return this.http.post(environment.apiUrl + '/authenticate', socialUser)
      .toPromise()
      .then((user: User) => {
        console.log(user);
        this.saveUserLocally(user);
        return user;
      })
      .catch(() => alert('Couldn\'t reach the project\'s server'));
  }

  isAuthenticated(): User | null {
    const user = this.getLocallySavedUser();
    if (user && user.expires > Date.now()) {
      return user;
    }
    return null;
  }

  private saveUserLocally(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private forgetUserLocally() {
    localStorage.removeItem('user');
  }

  getLocallySavedUser(): User | null {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {
    this.forgetUserLocally();
    location.reload();
  }
}