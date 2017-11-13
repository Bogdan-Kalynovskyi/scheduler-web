import { Injectable, NgModule, Injector} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { environment } from '../../environments/environment'
import { UserService } from '../services/user.service'

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  constructor(){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem('user')).token
    if(req.url != ( environment.url + '/authenticate' ))
      return next.handle(req.clone({ headers: req.headers.set('x-access-token', token) }))
    else return next.handle(req)
  }
}