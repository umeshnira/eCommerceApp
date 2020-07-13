import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { ClientModel } from '../models/client.model';
import { SellerModel } from '../models/seller-model';

@Injectable()

export class RegistrationService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {

    super();
  }

  registerClient(model: ClientModel) {
    const url = `${this.baseUrl}/clients`;
    return this.http.post<any>(url, model)
     .pipe(catchError(this.handleError)
    );
  }

  registerSeller(model: SellerModel) {
    const url = `${this.baseUrl}/sellers`;
    return this.http.post<any>(url, model)
     .pipe(catchError(this.handleError)
    );
  }
}
