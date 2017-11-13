import { Component, OnInit } from '@angular/core'
import {  AuthService, GoogleLoginProvider,SocialUser } from "angular4-social-login";

import { UserService } from '../services/user.service';

@Component({
	selector:'auth',
	templateUrl:'./auth.component.html',
	styleUrls:['./auth.component.css']
})

export class AuthComponent implements OnInit{

	loggedIn:boolean

	constructor(
		private userService:UserService,
		private authService: AuthService
	) { }
 
	ngOnInit() {
  	this.authService.authState.subscribe(user => this.loggedIn = (user != null));
  }

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
    	.then(user => this.userService.authenticate(user)
    		.subscribe(user => this.userService.saveUser(user)))
  }
  testToken(){
  	this.userService.testToken().subscribe(res => console.log(res)) 
  }
 
  signOut(): void {
    this.authService.signOut()
    	.then(() => this.userService.logout());
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