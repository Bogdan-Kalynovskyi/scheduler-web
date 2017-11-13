import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { environment } from '../../environments/environment'

@Injectable()

export class UserService {

	constructor(
		private http:HttpClient
	){}

	authenticate(user){
		return this.http.post(environment.url + '/authenticate',user)
	}
	testToken(){
		return this.http.get(environment.url + '/test-protected')
	}

	saveUser(user){
		localStorage.setItem('user',JSON.stringify(user))
	}
	getUser(){
		return JSON.parse(localStorage.getItem('user'))
	}
	logout(){
		localStorage.removeItem('user')
	}
}