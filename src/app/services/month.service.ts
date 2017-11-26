import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

@Injectable()

export class MonthService {

    constructor (private http: HttpClient) {}

    updateUserDays(subject, year, month, days ): Observable<any> {
        return this.http.post(`${environment.apiUrl}/${subject}/${year}/${month}`, days);
    }
    getUserDays(subject, year, month ): Observable<number[]> {
        return this.http.get(`${environment.apiUrl}/${subject}/${year}/${month}`)
            .map((res: number[]) => res);
    }
}