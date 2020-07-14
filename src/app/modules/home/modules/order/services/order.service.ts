import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { OrderDetailsModel } from '../models/order-details.model'
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';

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
}
