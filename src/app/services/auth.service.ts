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
  user;


  constructor(private http: HttpClient) {
    window['googleApiLoadedPromise']
    .then(() => this.onGapiLoaded())
    .catch(() => alert('You probably have privacy filtering enabled in AdBlock. Sign in with Google won\'t work then :('));
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
    this.user = this.getLocallySavedUser();
    if (this.user && this.user.expires < Date.now()) {
      this.dropServerSession();
      this.forgetUserLocally();
    }
    return this.user;
  }


  signIn(): Promise<User> {
    let savedGoogleUser;

    return this.googleApiLoaded
    .then(() => this.gapi.auth2.getAuthInstance().signIn())
    .then((googleUser) => {
      savedGoogleUser = googleUser;
      return this.authoriseOnServer(this.getUserCredentials(googleUser));
    })
    .then((response) => {
      const user = this.getUserProfile(savedGoogleUser);
      user.token = response.token;
      user.expires = response.expires;
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
    return JSON.parse(localStorage.getItem('user'));
  }
}