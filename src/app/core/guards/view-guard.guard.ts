import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Constants } from 'src/app/shared/models/constants';

@Injectable()

export class ViewGuard implements CanActivate {

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const userRole = this.authService.getCookie();

        if (userRole) {
            if (userRole === Constants.admin || userRole === Constants.seller) {
                return true;
            } else {
                return false;
            }
        }
    }
}
