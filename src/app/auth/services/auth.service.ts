import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  register(model) {
    return this.http.post<any>(this.url + '/auth/signUp', model);
  }
}