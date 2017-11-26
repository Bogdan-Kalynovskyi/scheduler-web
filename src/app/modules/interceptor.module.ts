import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.method === 'POST' && req.url === (environment.apiUrl + '/authenticate')) {
      return next.handle(req);
    }
    else {
      const token = JSON.parse(localStorage.getItem('user')).token;
      return next.handle(req.clone({headers: req.headers.set('csrf-token', token)}));
    }
  }
}