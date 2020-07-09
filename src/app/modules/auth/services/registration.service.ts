import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';

@Injectable()

export class RegistrationService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {

    super();
  }

  register(model) {
    const url = `${this.baseUrl}/clients`;
    return this.http.post<any>(url, model)
     .pipe(catchError(this.handleError)
    );
  }
}
