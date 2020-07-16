import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { OrderDetailsModel } from '../models/order-details.model'
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { ApiResponseModel } from '../../../../../shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends HttpBaseService {

  orderUrl = environment.api.orderUrl;
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
  cancelOrder(id: number) {
    const url = `${this.orderUrl}/cancel/orders/${id}`;
    return this.http.post<ApiResponseModel>(url,{})
      .pipe(catchError(this.handleError)
      );
  }

  addOrder(obj:any) {
    const url = `${this.orderUrl}/orders`;
    return this.http.post<ApiResponseModel>(url,obj)
      .pipe(catchError(this.handleError)
      );
  }
}
