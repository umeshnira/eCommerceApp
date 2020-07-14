import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { CartService } from '../../services/cart.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartDetailsModel } from '../../models/cart-details.model';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})

export class CartViewComponent implements OnInit, OnDestroy {

  cartDetails: CartDetailsModel;
  getCartDetailsSubscription: ISubscription;
  editCartDetailsSubscription: ISubscription;
  removeProductFromCartSubscription: ISubscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    const userId = userDetails.user_id;
    this.getCartDetails(userId);
  }

  editCartDetails(cartId: number) {
    const cartDetailsModel = new CartDetailsModel();
    this.editCartDetailsSubscription = this.cartService.editCartDetails(cartId, cartDetailsModel).subscribe(response => {

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  removeProductFromCart(cartId: number) {
    this.removeProductFromCartSubscription = this.cartService.deleteProductFromCart(cartId).subscribe(response => {

      this.router.navigate([RoutePathConfig.Home]);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  ngOnDestroy() {
    if (this.getCartDetailsSubscription) {
      this.getCartDetailsSubscription.unsubscribe();
    }
    if (this.editCartDetailsSubscription) {
      this.editCartDetailsSubscription.unsubscribe();
    }
  }

  private getCartDetails(userId: number) {
    this.getCartDetailsSubscription = this.cartService.getCartDetails(userId).subscribe(response => {

      if (response) {
        this.cartDetails = response;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}

  // cartQuantityCal() {

  //   this.cartItems = 0;
  //   this.totalPrice = 0;

  //   for (let i = 0; i < this.cartView.length; i++) {
  //     // tslint:disable-next-line: radix
  //     this.cartItems = this.cartItems + parseInt(this.cartView[i].cartQuant);
  //     // tslint:disable-next-line: radix
  //     this.totalPrice = this.totalPrice + parseInt(this.cartView[i].price) * parseInt(this.cartView[i].cartQuant);
  //   }
  // }

  // removeCartItem(productID) {

  //   this.cartView = this.locCart.deleteCartItem(productID);
  //   this.cartQuantityCal();
  // }

  // addSaveLaterList(prod) {

  //   this.saveLate.addToMylaterList(prod);
  //   this.cartQuantityCal();
  // }

  // addTocart(prod) {

  //   this.locCart.addToCartValues(prod);
  //   this.cartQuantityCal();
  // }

  // deletesaveLaterList(productID) {

  //   this.saveLate.deleteLaterListItem(productID);
  // }
