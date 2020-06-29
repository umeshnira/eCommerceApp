import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()

export class ProductService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  addProduct(model: FormData) {
    return this.http.post<any>(this.url + '/ecommerce/product', model);
}
}
