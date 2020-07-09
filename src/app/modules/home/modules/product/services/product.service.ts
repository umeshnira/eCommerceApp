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

  editProduct(id: number, model: FormData) {

    const url = `${this.baseUrl}/products/${id}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  getProductDetails(id: number) {

    const url = `${this.baseUrl}/products/${id}`;
    return this.http.get<ProductModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getProducts(id: number) {

    const url = `${this.baseUrl}/categories/${id}/products`;
    return this.http.get<ProductDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  deleteProduct(id: number) {

    const url = `${this.baseUrl}/products/${id}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
