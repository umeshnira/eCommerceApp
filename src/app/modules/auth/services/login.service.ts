import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';

@Injectable()
export class LoginService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  login(model) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<any>(url, model)
      .pipe(catchError(this.handleError)
      );
  }
}
