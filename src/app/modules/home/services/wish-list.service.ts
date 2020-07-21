import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WishListModel } from '../models/wish-list.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { catchError } from 'rxjs/operators';

@Injectable()

export class WishListService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  moveSaveLaterItemToWishList(model: WishListModel) {
    const url = `${this.baseUrl}/wishlist`;
    return this.http.post<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  getWishListItemsByUserId(userId: number) {
    const url = `${this.baseUrl}/wishlist/${userId}`;
    return this.http.get<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

  deleteWishListItem(wishListId: number) {
    const url = `${this.baseUrl}/savelater/${wishListId}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
