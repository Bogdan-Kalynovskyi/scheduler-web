import { Component, OnInit } from '@angular/core'
import {  AuthService, GoogleLoginProvider, SocialUser } from "angular4-social-login";

import { UserService } from '../services/user.service';

@Component({
	selector:'auth',
	templateUrl:'./auth.component.html',
	styleUrls:['./auth.component.css']
})

export class AuthComponent implements OnInit{

	loggedIn:boolean

	constructor(
		private userService: UserService,
		private authService: AuthService
	) { }
 
	ngOnInit() {
  	this.loggedIn = this.userService.isAuthenticated()
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    	.then((user:SocialUser) => this.userService.authenticate(user)
    		.subscribe((user:User) => {
    			this.userService.saveUser(user)
    			this.loggedIn = true;
    		}))
  }
 
  signOut(): void {
    this.authService.signOut()
    	.then(() => {
    		this.userService.logout()
    		this.loggedIn = false
    	});
  }
}

interface User{
	name:String,
	id:String,
	email:String,
	photoUrl:String,
	token:String,
	expires:String
}