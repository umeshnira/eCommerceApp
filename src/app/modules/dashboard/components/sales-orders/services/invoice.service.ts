import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { InvoiceViewListModel } from '../models/invoice-view-list.model';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService extends HttpBaseService {

  orderUrl = environment.api.orderUrl;
  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  getInvoiceOrderDetails(id: number) {
    const url = `${this.orderUrl}/orders/${id}/invoice`;
    return this.http.get<InvoiceViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  getInvoiceClientDetails(id: number) {
    const url = `${this.orderUrl}/orders/${id}/invoice/client`;
    return this.http.get<InvoiceViewListModel>(url)
      .pipe(catchError(this.handleError)
      );
  }
}
