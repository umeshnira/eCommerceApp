import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { CouponViewListModel } from '../models/coupon-view-list.model';
import { CouponTableModel } from '../models/coupon-table.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class CouponService extends HttpBaseService {

  orderUrl = environment.api.orderUrl;
  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getAllCoupon() {
    const url = `${this.baseUrl}/coupon`;
    return this.http.get<CouponViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getCoupon(id: number) {
    const url = `${this.baseUrl}/coupon/${id}`;
    return this.http.get<CouponViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  createCoupon(model: CouponTableModel) {

    const url = `${this.baseUrl}/coupon`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }
  UpdateCoupon(model: CouponTableModel, id: number) {

    const url = `${this.baseUrl}/coupon/${id}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }
}
