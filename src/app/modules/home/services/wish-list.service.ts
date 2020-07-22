import { Injectable } from '@angular/core';
import { HttpBaseService } from 'src/app/core/services/http-base-service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { WishListModel } from '../models/wish-list.model';
import { ApiResponseModel } from 'src/app/shared/models/api-response.model';
import { catchError } from 'rxjs/operators';
import { WishListDetails } from '../models/wish-list-details.model';

@Injectable()

export class WishListService extends HttpBaseService {

  baseUrl = environment.api.baseUrl;

  constructor(private http: HttpClient) {
    super();
  }

  moveItemToWishList(model: WishListModel) {
    const url = `${this.baseUrl}/wishlist`;
    return this.http.put<ApiResponseModel>(url, model)
      .pipe(catchError(this.handleError)
      );
  }

  getWishListItemsByUserId(userId: number) {
    const url = `${this.baseUrl}/wishlist/${userId}`;
    return this.http.get<WishListDetails>(url)
      .pipe(catchError(this.handleError)
      );
  }

  deleteWishListItem(wishListId: number) {
    const url = `${this.baseUrl}/wishlist/${wishListId}`;
    return this.http.delete<ApiResponseModel>(url)
      .pipe(catchError(this.handleError)
      );
  }

}
