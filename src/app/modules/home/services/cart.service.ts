import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CartModel } from '../modules/product/models/cart.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { catchError } from 'rxjs/operators';
import { CartDetailsModel } from '../models/cart-details.model';

@Injectable()
export class CartService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  addProductToCart(model: CartModel) {
    const url = `${this.baseUrl}/carts`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  editCartDetails(cartId: number, model: CartDetailsModel) {
    const url = `${this.baseUrl}/carts/${cartId}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  deleteProductFromCart(cartId: number) {
    const url = `${this.baseUrl}/carts/${cartId}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getCartDetails(userId: number) {
    const url = `${this.baseUrl}/carts/${userId}`;
    return this.http.get<CartDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
}
