import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import * as moment from 'moment'

import { environment } from '../../environments/environment'

@Injectable()

export class UserService {

	constructor(
		private http:HttpClient
	){}

	authenticate(user){
		return this.http.post(environment.url + '/authenticate',user)
	}
	isAuthenticated(){
		let tokenExp = this.getUser().expires
		if(tokenExp > moment().valueOf){
			console.log('expired')
			this.logout()
			return false
		}else {
				console.log('token valid')
				return true
			}
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