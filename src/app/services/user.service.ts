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
    return this.http.get<User[]>(`${environment.apiUrl}/admin/users`)
    .toPromise();
  }

  saveUser(user: User): Promise<User> {
    return this.http.post<User>(`${environment.apiUrl}/admin/users`, user)
    .toPromise();
  }

  deleteUser(user: User): Promise<any> {
    return this.http.delete(`${environment.apiUrl}/admin/users/${user.googleId}`)
    .toPromise();
  }
}