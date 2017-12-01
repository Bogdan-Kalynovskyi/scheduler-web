import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import User from '../models/user';


@Injectable()

export class AuthService {
  gapi;
  private resolveApiLoaded: Function;
  googleApiLoaded = new Promise((resolve) => {
    this.resolveApiLoaded = resolve;
  });
  expiryTime = 3600 * 1000;
  private keepAliveHandler;
  user;


  constructor(private http: HttpClient) {
    this.loadGapi();
    const apiLastAccess = +localStorage.getItem('apiLastAccessTime');
    if (apiLastAccess && Date.now() > apiLastAccess + this.expiryTime) {
      this.forgetUserLocally();
    }
    if (this.isAuthenticated()) {
      this.scheduleKeepAlive();
    }
  }


  private loadGapi() {
    const scriptEl = <HTMLScriptElement>document.createElement('SCRIPT');
    scriptEl.onload = () => this.onGapiLoaded();
    scriptEl.onerror = () => alert('You probably have privacy filtering enabled in AdBlock. Sign in with Google won\'t work then :(');
    scriptEl.async = true;  scriptEl.defer = true;
    scriptEl.src = 'https://apis.google.com/js/platform.js';
    document.body.appendChild(scriptEl);
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
    return this.getLocallySavedUser();
  }


  isAdmin(): boolean {
    return this.isAuthenticated() && this.user.isAdmin;
  }


  signIn(): Promise<User> {
    let user;

    return this.googleApiLoaded
    .then(() => this.gapi.auth2.getAuthInstance().signIn())
    .then((googleUser) => {
      user = this.getUserProfile(googleUser);
      return this.authoriseOnServer(this.getUserCredentials(googleUser));
    })
    .then(({token}) => {
      user.token = token;
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


  private getUserCredentials(googleUser) {
    const googleId = googleUser.getBasicProfile().getId();
    const idToken = googleUser.getAuthResponse().id_token;
    return {
      googleId: googleId,
      idToken: idToken
    };
  }


  scheduleKeepAlive() {
    clearTimeout(this.keepAliveHandler);
    this.keepAliveHandler = setTimeout(() => {
      this.http.get(environment.apiUrl + '/authenticate');
    }, this.expiryTime);
  }


  private getUserProfile(googleUser): any {
    const profile = googleUser.getBasicProfile();
    return {
      googleId: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      photoUrl: profile.getImageUrl()
    };
  }


  private authoriseOnServer(user): Promise<any> {
    return this.http.post(environment.apiUrl + '/authenticate', user)
    .toPromise();
  }

  private dropServerSession(): Promise<any> {
    return this.http.delete(environment.apiUrl + '/authenticate')
    .toPromise();
  }


  private saveUserLocally(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  private forgetUserLocally() {
    localStorage.removeItem('user');
    this.user = null;
  }

  private getLocallySavedUser(): User | null {
    return this.user = JSON.parse(localStorage.getItem('user'));
  }
}