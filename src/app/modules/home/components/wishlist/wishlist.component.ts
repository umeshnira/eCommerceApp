import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { WishListService } from '../../services/wish-list.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { WishListDetails } from '../../models/wish-list-details.model';
import { CartModel } from '../../modules/product/models/cart.model';
import { CartService } from '../../services/cart.service';
import { Constants } from 'src/app/shared/models/constants';
import { WishListModel } from '../../models/wish-list.model';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})

export class WishlistComponent implements OnInit, OnDestroy {
  userId: number;
  ratingClicked: number;
  itemIdRatingClicked: string;
  wishListName: string;

  wishList: WishListDetails[];

  getWhishListSubscription: ISubscription;
  getlocationDetailsSubscription: ISubscription;
  addToCartSubscription: ISubscription;
  removeWishListItemSubscription: ISubscription;
  createWishListSubscription: ISubscription;

  constructor(
    private wishListService: WishListService,
    private authService: AuthService,
    private toastr: ToastrService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getWhishList();
  }

  moveToCart(item: WishListDetails) {
    const cartModel = new CartModel();
    cartModel.user_id = this.userId;
    cartModel.product_id = item.productId;
    cartModel.quantity = 1;
    cartModel.created_by = Constants.client;

    this.addToCartSubscription = this.cartService.moveItemToCart(cartModel)
      .subscribe(response => {
        if (response) {
          this.toastr.success('Item moved to Cart Successfully', 'Success');
          this.removeWishList(item.id);
        }

      }, (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  removeWishList(wishListId: number) {
    this.removeWishListItemSubscription = this.wishListService.deleteWishListItem(wishListId)
      .subscribe(response => {
        if (response) {
          this.toastr.success('Removed Item from WishList Successfully', 'Success');
          this.getWhishList();
        }

      }, (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  createWishList() {
    const wishListModel = new WishListModel();
    wishListModel.name = this.wishListName;
    wishListModel.created_by = Constants.seller;
    this.createWishListSubscription = this.wishListService.createWishList(wishListModel)
    .subscribe(response => {
      if (response) {
      }

    }, (error) => {
      this.toastr.error('', error.error.message);
    });
  }

  getWishList(){
    
  }

  ngOnDestroy() {
    if (this.getWhishListSubscription) {
      this.getWhishListSubscription.unsubscribe();
    }
    if (this.removeWishListItemSubscription) {
      this.removeWishListItemSubscription.unsubscribe();
    }
    if (this.addToCartSubscription) {
      this.addToCartSubscription.unsubscribe();
    }
    if (this.createWishListSubscription) {
      this.createWishListSubscription.unsubscribe();
    }
  }

  private getWhishList() {
    this.getWhishListSubscription = this.wishListService.getWishListItemsByUserId(this.userId)
      .subscribe(response => {
        if (response) {
          this.wishList = response;
        }

      }, (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}
