import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SellerDetailsModel } from '../models/seller-details.model';
import { catchError } from 'rxjs/operators';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';

@Injectable()
export class SellerService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {

      super();
  }

  getAllSellers() {
      const url = `${this.baseUrl}/sellers`;
      return this.http.get<SellerDetailsModel[]>(url)
          .pipe(catchError(this.handleError)
          );
  }

  updateSellerRegistrationStatus(sellerId: number, model: SellerDetailsModel) {
    const url = `${this.baseUrl}/sellers/${sellerId}`;
    return this.http.patch<ApiResponseModel>(url, model)
        .pipe(catchError(this.handleError)
        );
}
}
