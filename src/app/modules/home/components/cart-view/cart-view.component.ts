import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { CartService } from '../../services/cart.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartDetailsModel } from '../../models/cart-details.model';
import { Router } from '@angular/router';
import { SaveLaterModel } from '../../models/save-later.model';
import { Constants } from 'src/app/shared/models/constants';
import { SaveLaterDetails } from '../../models/save-later-details.model';
import { CartModel } from '../../modules/product/models/cart.model';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})

export class CartViewComponent implements OnInit, OnDestroy {

  cartItems = 0;
  totalPrice = 0;
  userId: number;

  cartDetails: CartDetailsModel[];
  saveLaterItems: SaveLaterDetails[];

  getCartDetailsSubscription: ISubscription;
  editCartDetailsSubscription: ISubscription;
  removeProductFromCartSubscription: ISubscription;
  moveItemToSaveLaterSubscription: ISubscription;
  getSaveLaterItemsSubscription: ISubscription;
  deleteItemFromSaveLaterSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;

  constructor(
    private cartService: CartService,
    private authService: AuthService,
    private saveLaterSerice: SaveForLaterService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getCartDetails(this.userId);
    this.getSaveLaterItems(this.userId);
  }

  editCartDetails(cartId: number) {
    const cartDetailsModel = new CartModel();
    this.editCartDetailsSubscription = this.cartService.editCartDetails(cartId, cartDetailsModel)
      .subscribe(response => {

      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  removeCartItem(cartId: number) {
    this.removeProductFromCartSubscription = this.cartService.deleteProductFromCart(cartId)
      .subscribe(response => {

        this.getCartDetails(this.userId);
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  updateCartQuantity(cartId: number, productId: number) {
    const cartModel = new CartModel();
    cartModel.quantity = this.cartItems;
    cartModel.product_id = productId;
    cartModel.user_id = this.userId;
    cartModel.updated_by = Constants.client;

    this.editCartDetailsSubscription = this.cartService.editCartDetails(cartId, cartModel)
      .subscribe(response => {

      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  moveCartItemToSaveLater(productId: number, cartId: number) {
    const saveLaterModel = new SaveLaterModel();
    saveLaterModel.user_id = this.userId;
    saveLaterModel.product_id = productId;
    saveLaterModel.created_by = Constants.client;

    this.moveItemToSaveLaterSubscription = this.saveLaterSerice.moveCartItemToSaveLater(saveLaterModel)
      .subscribe(response => {

        if (response) {
          this.getCartDetails(this.userId);
          this.getSaveLaterItems(this.userId);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  deleteItemFromSaveLaterList(productId: number) {
    this.deleteItemFromSaveLaterSubscription = this.saveLaterSerice.deleteItemFromSaveLater(productId)
      .subscribe(response => {

      },
        (error) => {
          this.toastr.error('', error.error.message);
        });

  }

  addProductToCart(item: SaveLaterDetails) {
    const cartModel = new CartModel();
    cartModel.user_id = this.userId;
    cartModel.product_id = item.productId;
    cartModel.quantity = 1;
    cartModel.created_by = Constants.client;
    this.addProductToCartSubscription = this.cartService.addProductToCart(cartModel).subscribe(response => {

      if (response) {
        this.getCartDetails(this.userId);
        this.getSaveLaterItems(this.userId);
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  calculateCartQuantity() {
    this.cartItems = 0;
    this.totalPrice = 0;

    for (let i = 0; i < this.cartDetails.length; i++) {
      this.cartItems = this.cartItems + Number(this.cartDetails[i].quantity);
      this.totalPrice = this.totalPrice + Number(this.cartDetails[i].price) * Number(this.cartDetails[i].quantity);

    }
  }

  ngOnDestroy() {
    if (this.getCartDetailsSubscription) {
      this.getCartDetailsSubscription.unsubscribe();
    }
    if (this.editCartDetailsSubscription) {
      this.editCartDetailsSubscription.unsubscribe();
    }
    if (this.moveItemToSaveLaterSubscription) {
      this.moveItemToSaveLaterSubscription.unsubscribe();
    }
    if (this.getSaveLaterItemsSubscription) {
      this.getSaveLaterItemsSubscription.unsubscribe();
    }
    if (this.deleteItemFromSaveLaterSubscription) {
      this.deleteItemFromSaveLaterSubscription.unsubscribe();
    }
    if (this.addProductToCartSubscription) {
      this.addProductToCartSubscription.unsubscribe();
    }
  }

  private getCartDetails(userId: number) {
    this.getCartDetailsSubscription = this.cartService.getCartDetails(userId).subscribe(response => {

      if (response) {
        this.cartDetails = response;
        this.calculateCartQuantity();
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  private getSaveLaterItems(userId: number) {
    this.saveLaterItems = [];

    this.getSaveLaterItemsSubscription = this.saveLaterSerice.getSaveLaterItems(userId)
      .subscribe(response => {

        if (response) {
          this.saveLaterItems = response;
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }
}

