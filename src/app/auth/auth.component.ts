import {Component, OnInit} from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angular4-social-login";

import {UserService} from '../services/user.service';

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  loggedIn: boolean;

  constructor(private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit() {
    this.loggedIn = this.userService.isAuthenticated();
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    .then((user: SocialUser) => this.userService.authenticate(user)
    .subscribe((_user: User) => {
      this.userService.saveUser(_user);
      this.loggedIn = true;
    }));
  }

  signOut(): void {
    this.authService.signOut()
    .then(() => {
      this.userService.logout();
      this.loggedIn = false;
    });
  }
}

interface User {
  name: string;
  id: string;
  email: string;
  photoUrl: string;
  token: string;
  expires: string;
}