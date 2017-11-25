import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()

export class MonthService {
    constructor (private http: HttpClient) {}

    // updateUserAvailability() {
    //     return this.http.post(`${environment.apiUrl}/availability/:year/:month`,)
    // }
}