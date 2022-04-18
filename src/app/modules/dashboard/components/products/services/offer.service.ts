import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { OfferModel } from 'src/app/modules/home/modules/product/models/offer.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { catchError } from 'rxjs/operators';

@Injectable()
export class OfferService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  createOffer(model: OfferModel) {
    const url = `${this.baseUrl}/offer`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  updateOffer(model: OfferModel,id) {
    const url = `${this.baseUrl}/offer/${id}`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  saveUpdateOfferProductsSelected(){
    
  }
  getAllOffers() {
    const url = `${this.baseUrl}/offer`;
    return this.http.get<OfferModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
  getOfferDetails(id) {
    const url = `${this.baseUrl}/offer/${id}`;
    return this.http.get<OfferModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  statusChangeOffer(id,status){
    const url = `${this.baseUrl}/offer/${id}?status=${status}`;
    return this.http.patch<OfferModel>(url,{})
      .pipe(catchError(this.handleError)
      );
  }
  getOfferProducts(id,status){
    const url = `${this.baseUrl}/offer/${id}/product?status=${status}`;
    return this.http.get<OfferModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
