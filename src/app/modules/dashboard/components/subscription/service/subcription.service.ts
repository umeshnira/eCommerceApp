import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { SubscriptionViewListModel } from '../models/subscription-view-List.model';
import { SubscriptionPlanTableModel } from '../models/subscription-plan-table.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class SubcriptionService extends HttpBaseService{

  orderUrl = environment.api.orderUrl;
  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  createSubcription(model: SubscriptionPlanTableModel) {

    const url = `${this.baseUrl}/subcription`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }
  updateSubcription(model: SubscriptionPlanTableModel,Id:number) {

    const url = `${this.baseUrl}/subcription/${Id}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }
  getSubcription(id: number) {
    const url = `${this.baseUrl}/subcription/${id}`;
    return this.http.get<SubscriptionViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getAllSubcription() {
    const url = `${this.baseUrl}/subcription/`;
    return this.http.get<SubscriptionViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
}
