import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  getCategories() {
    return this.http.get<any>(this.url + '/productTypes/getAllProductTypes');
  }
}
