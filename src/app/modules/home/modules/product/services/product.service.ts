import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponseModel } from '../../../../../shared/models/api-response.model';
import { ProductModel } from '../models/product.model';
import { ProductDetailsModel } from '../models/product-details.model';

@Injectable()

export class ProductService {

  url = environment.api.baseUrl;

  constructor(private http: HttpClient) { }

  addProduct(model: FormData) {
    return this.http.post<ApiResponseModel>(this.url + '/ecommerce/products', model);
  }

  editProduct(id: number, model: FormData) {
    return this.http.put<ApiResponseModel>(this.url + '/ecommerce/products/' + id, model);
  }

  getProductDetails(id: number) {
    return this.http.get<ProductModel>(this.url + '/ecommerce/products/' + id);
  }

  getProducts(id: number) {
    return this.http.get<ProductDetailsModel>(this.url + '/ecommerce/categories/' + id + '/products');
  }

  deleteProduct(id: number) {
    return this.http.delete<ApiResponseModel>(this.url + '/ecommerce/products/' + id);
  }

}
