import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse} from '@angular/common/http';
import 'rxjs/add/operator/do';

import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';


@Injectable()
export class HttpsRequestInterceptor implements HttpInterceptor {
  private authService: AuthService;

  constructor(private injector: Injector) { }


  private interceptResponse(observable) {
    return observable.do(() => {
      localStorage.setItem('apiLastAccessTime', Date.now().toString());
      this.authService.scheduleKeepAlive();
    },
    error => {
      if (error instanceof HttpErrorResponse) {
        debugger
        switch (error.status) {
          case 0:
            alert('You\'ve lost internet connection, please retry');
            break;
          case 401:
            alert('Your session has been expired. You\'ll now be logged out.');
            this.authService.signOut();
            break;
          case 403:
            alert('You are not allowed here');
            this.authService.signOut();
            break;
          case 400:
            alert('Bug in the app');
            break;
          case 500:
            alert('Server is sick');
            break;
        }
      }
      return Observable.throw(error);
    });
  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);

    if (request.method === 'POST' && request.url === (environment.apiUrl + '/authenticate')) {
      return this.interceptResponse(next.handle(request));
    }
    else {
      const token = this.authService.user && this.authService.user.token;
      if (token) {
        return this.interceptResponse(next.handle(request
            .clone({headers: request.headers.set('csrf-token', token)})
        ));
      }
      alert('Trying to access endpoint not being authorised');
      throw 401;
    }
  }
}