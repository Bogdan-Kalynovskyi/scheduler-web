import { Injectable } from '@angular/core';
import { CanActivate, CanLoad,
    Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthService} from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(private authService: AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.authService.isAdmin();
    }

    canLoad(route: Route): boolean  {
        return this.authService.isAdmin();
    }
}