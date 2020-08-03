import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserStorageDetailsModel } from '../models/user-storage-detail.model';

@Injectable()
export class AuthService {

  constructor(
    private cookieService: CookieService
  ) { }

  setUserDetailsInCookie(user: UserStorageDetailsModel) {
    this.cookieService.deleteAll();
    this.cookieService.set('role', user.role);
    this.cookieService.set('userId', String(user.user_id));
  }

  getUserDetailsFromCookie() {
    const user = new UserStorageDetailsModel();
    user.role = this.cookieService.get('role');
    user.user_id = Number(this.cookieService.get('userId'));
    return user;
  }

}
