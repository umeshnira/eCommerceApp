import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class AuthService {

  constructor(
    private cookieService: CookieService
  ) { }

  setCookie(value: string) {
    this.cookieService.set('role', value);
  }

  getCookie() {
    return this.cookieService.get('role');
  }

}
