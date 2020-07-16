import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SaveLaterModel } from '../models/save-later.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { catchError } from 'rxjs/operators';

@Injectable()

export class SaveForLaterService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  moveCartItemToSaveLater(model: SaveLaterModel) {
    const url = `${this.baseUrl}/savelater`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  getSaveLaterItems(cartId: number) {
    const url = `${this.baseUrl}/savelater/${cartId}`;
    return this.http.get<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  deleteItemFromSaveLater(saveLaterID: number) {
    const url = `${this.baseUrl}/savelater/${saveLaterID}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
