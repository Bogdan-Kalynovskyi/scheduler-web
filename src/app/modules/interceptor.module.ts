import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url !== (environment.authUrl + '/authenticate')) {
      const token = JSON.parse(localStorage.getItem('user')).token;

      return next.handle(req.clone({headers: req.headers.set('x-access-token', token)}));
    }
    else {
      return next.handle(req);
    }
  }
}