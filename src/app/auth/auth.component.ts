import {Component, OnInit} from '@angular/core';

import {AuthService} from '../services/auth.service';
import User from '../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {
  user: User;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.user = this.authService.isAuthenticated();
  }

  signIn() {
    this.authService.signIn()
    .then(user => this.user = user);
  }

  signOut() {
    this.authService.signOut()
    .then(() => location.reload());
  }
}