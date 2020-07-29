import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiResponseModel } from '../../../../../shared/models/api-response.model';
import { ProductModel } from '../models/product.model';
import { ProductDetailsModel } from '../models/product-details.model';
import { catchError } from 'rxjs/operators';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';

@Injectable()

export class ProductService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  addProduct(model: FormData) {

    const url = `${this.baseUrl}/products`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  editProduct(productId: number, model: FormData) {

    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  getProductDetails(productId: number) {

    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.get<ProductDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getProductsByCategoryId(categoryId: number) {

    const url = `${this.baseUrl}/categories/${categoryId}/products`;
    return this.http.get<ProductDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getProductsBySellerId(sellerId: number) {

    const url = `${this.baseUrl}/sellers/${sellerId}/products`;
    return this.http.get<ProductDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  deleteProduct(productId: number) {

    const url = `${this.baseUrl}/products/${productId}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getProducts() {

    const url = `${this.baseUrl}/products`;
    return this.http.get<ProductDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
