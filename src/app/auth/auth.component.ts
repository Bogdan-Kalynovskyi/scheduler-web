import {Component, OnInit} from '@angular/core';
import {AuthService as GoogleAuthService, GoogleLoginProvider, SocialUser} from 'angular4-social-login';

import {AuthService} from '../services/auth.service';
import User from '../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  user: User | null;

  constructor(private googleAuthService: GoogleAuthService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.isAuthenticated();
  }

  signInWithGoogle() {
    this.googleAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((user: SocialUser) => {
      this.authService.saveTokenToDb(user)
      .then((_user) => this.user = _user);
    });
  }

  signOut() {
    this.googleAuthService.signOut()
    .then(() => {
      this.authService.logout();
      this.user = null;
    });
  }
}