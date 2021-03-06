import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/app/shared/models/constants';

@Injectable()

export class HomeViewGuard implements CanActivate {

    constructor(
        private authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const userdetails = this.authService.getUserDetailsFromCookie();
        const userRole = userdetails.role;
        return userRole && (userRole === Constants.admin || userRole === Constants.seller) ? true : false;
    }
}
