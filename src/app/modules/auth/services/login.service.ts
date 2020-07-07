import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  login(model) {
    return this.http.post<any>(this.url + '/ecommerce/login', model);
  }
}
