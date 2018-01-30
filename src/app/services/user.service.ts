import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import 'rxjs/add/operator/map';
import User from '../models/user';


@Injectable()
export class UserService {

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Promise<User[]> {
    return this.http.get(`${environment.apiUrl}/admin/users`)
    .toPromise()
    .then(response => response as User[]);
  }

  saveUser(user: User): Promise<User> {
    return this.http.post(`${environment.apiUrl}/admin/users`, user)
    .toPromise()
    .then(response => response as User);
  }

  deleteUser(user: User): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/admin/users/${user.googleId}`)
    .toPromise();
  }
}