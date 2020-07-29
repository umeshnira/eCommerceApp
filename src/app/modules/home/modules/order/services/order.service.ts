import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { OrderDetailsModel } from '../models/order-details.model'
import { OrderLocationTableModel } from '../models/order-location-table.model'
import { OrderReturnTableModel } from '../models/order-return-table.model'
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { ApiResponseModel } from '../../../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpBaseService {

  orderUrl = environment.api.orderUrl;
  baseUrl = environment.api.baseUrl;
  notificUrl = environment.api.notificUrl;

  orderStorage;//for store order details


  constructor(private http: HttpClient) {
    super();
  }

  getUserOrders(id: number) {
    const url = `${this.orderUrl}/user/orders/${id}`;
    return this.http.get<OrderDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getCancelledOrders(id: number) {
    const url = `${this.orderUrl}/cancel/orders/${id}`;
    return this.http.get<OrderDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getLocationDetails(id: number) {
    const url = `${this.baseUrl}/clients/user/${id}`;
    return this.http.get<OrderLocationTableModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getBuyAgainProducts(id: number) {
    const url = `${this.orderUrl}/orders/buyAgain/${id}`;
    return this.http.get<OrderLocationTableModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getOpenOrders(id: number) {
    const url = `${this.orderUrl}/orders/openOrder/${id}`;
    return this.http.get<OrderLocationTableModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  cancelOrder(id: number) {
    const url = `${this.orderUrl}/cancel/orders/${id}`;
    return this.http.post<ApiResponseModel>(url, {})
      .pipe(catchError(this.handleError)
      );
  }

  getSellerOrders(id: number) {
    const url = `${this.orderUrl}/orders/sellerorders/${id}`;
    return this.http.get<OrderDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getSellerReturnOrders(id: number) {
    const url = `${this.orderUrl}/orders/sellerreturnorders/${id}`;
    return this.http.get<OrderDetailsModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  returnOrder(obj: OrderReturnTableModel) {
    const url = `${this.orderUrl}/orders/return`;
    return this.http.post<ApiResponseModel>(url, obj)
      .pipe(catchError(this.handleError)
      );
  }

  sendMail(id: number) {
    const url = `${this.notificUrl}/mail/${id}`;
    return this.http.post<ApiResponseModel>(url, {})
      .pipe(catchError(this.handleError)
      );
  }

  addOrder(obj: any) {
    const url = `${this.orderUrl}/orders`;
    return this.http.post<ApiResponseModel>(url, obj)
      .pipe(catchError(this.handleError)
      );
  }
}
