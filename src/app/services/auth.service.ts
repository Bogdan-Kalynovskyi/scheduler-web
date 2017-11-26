import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';

import {environment} from '../../environments/environment';
import User from '../models/user';

@Injectable()
export class AuthService {
  gapi;
  private resolveApiLoaded: Function;
  googleApiLoaded = new Promise((resolve) => {
    this.resolveApiLoaded = resolve;
  });
  user;


<<<<<<< HEAD
  saveTokenToDb(socialUser: SocialUser): Promise<any> {
    return this.http.post(environment.apiUrl + '/authenticate', socialUser)
      .toPromise()
      .then((user: User) => {
        console.log(user);
        this.saveUserLocally(user);
        return user;
      })
      .catch(() => alert('Couldn\'t reach the project\'s server'));
=======
  constructor(private http: HttpClient) {
    window['googleApiLoadedPromise']
    .then(() => this.onGapiLoaded())
    .catch(() => alert('You probably have privacy filtering enabled in AdBlock. Sign in with Google won\'t work then :('));
>>>>>>> develop
  }


  private onGapiLoaded() {
    this.gapi = window['gapi'];
    this.gapi.load('auth2', this.onAuth2Loaded.bind(this));
  }


  private onAuth2Loaded() {
    this.gapi.auth2.init({
      client_id: environment.googleClientId
    });
    this.resolveApiLoaded();
  }


  isAuthenticated(): User | null {
    const user = this.getLocallySavedUser();
    if (user && user.expires > Date.now()) {
      return user;
    }
    return null;
  }


  signIn(): Promise<any> {
    return this.googleApiLoaded
    .then(() => this.gapi.auth2.getAuthInstance().signIn())
    .then((googleUser) => this.authoriseOnServer(this.fetchUserInfo(googleUser)))
    .then((user: User) => {
      if (!user) {throw ''}
      this.saveUserLocally(user);
      return user;
    });
  }


  signOut(): Promise<any> {
    return this.googleApiLoaded
    .then(() => this.gapi.auth2.getAuthInstance().signOut())
    .then(() => this.dropServerSession())
    .then(() => this.forgetUserLocally());
  }


  private fetchUserInfo(googleUser) {
    const googleId = googleUser.getBasicProfile().getId();
    const idToken = googleUser.getAuthResponse().id_token;
    return {
      googleId: googleId,
      idToken: idToken
    };
  }

  private authoriseOnServer(user): Promise<any> {
    return this.http.post(environment.apiUrl + '/authenticate', user)
    .toPromise()
    .catch(() => alert('Couldn\'t reach the project\'s server'));
  }

  private dropServerSession(): Promise<any> {
    return this.http.delete(environment.apiUrl + '/authenticate/' + this.user.googleId)
    .toPromise();
  }


  private saveUserLocally(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  private forgetUserLocally() {
    localStorage.removeItem('user');
  }

  private getLocallySavedUser(): User | null {
    return JSON.parse(localStorage.getItem('user'));
  }
}