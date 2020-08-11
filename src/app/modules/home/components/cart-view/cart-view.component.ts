import { Component, OnInit, OnDestroy } from '@angular/core';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { CartService } from '../../services/cart.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CartDetailsModel } from '../../models/cart-details.model';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { SaveLaterModel } from '../../models/save-later.model';
import { Constants } from 'src/app/shared/models/constants';
import { SaveLaterDetails } from '../../models/save-later-details.model';
import { CartModel } from '../../modules/product/models/cart.model';
import { OrderDetailsTableModel } from '../../modules/order/models/order-details-table.model';
import { OrderLocationTableModel } from '../../modules/order/models/order-location-table.model';
import { OrderOffersTableModel } from '../../modules/order/models/order-offer-table.model';
import { OrderService } from '../../modules/order/services/order.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { WishListModel } from '../../models/wish-list.model';
import { WishListService } from '../../services/wish-list.service';
import { OrderProductModel } from '../../modules/order/models/order-product.model';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})

export class CartViewComponent implements OnInit, OnDestroy {

  cartItems = 0;
  totalPrice = 0;
  userId: number;
  itemIndex: number;
  limitedStock: boolean;
  outOfStock: boolean;

  cartDetails: CartDetailsModel[];
  saveLaterItems: SaveLaterDetails[];
  locationDetails: OrderLocationTableModel[];

  getCartDetailsSubscription: ISubscription;
  editCartDetailsSubscription: ISubscription;
  removeProductFromCartSubscription: ISubscription;
  moveItemToSaveLaterSubscription: ISubscription;
  getSaveLaterItemsSubscription: ISubscription;
  deleteItemFromSaveLaterSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;
  moveSaveItemToCartSubscription: ISubscription;
  getlocationDetailsSubscription: ISubscription;
  moveItemToWishListSubscription: ISubscription;

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private saveLaterSerice: SaveForLaterService,
    private wishListService: WishListService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getCartDetails(this.userId);
    this.getSaveLaterItems(this.userId);
    this.getUserDetails(this.userId);
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

  updateCartQuantity(item: CartDetailsModel, event: any, itemIndex: number) {
    this.limitedStock = false;

    const newQuantity = event.target.value;

    this.calculateCartQuantity();

    if (newQuantity > item.left_qty) {
      this.limitedStock = true;
      this.itemIndex = itemIndex;
    } else {

      const cartModel = new CartModel();
      cartModel.quantity = newQuantity;
      cartModel.product_id = item.id;
      cartModel.user_id = this.userId;
      cartModel.updated_by = Constants.client;

      this.editCartDetailsSubscription = this.cartService.editCartDetails(item.CartId, cartModel)
        .subscribe(response => {

        },
          (error) => {
            this.toastr.error('', error.error.message);
          });
    }

  }

  moveCartItemToSaveLater(item: CartModel, index: number) {
    const saveLaterModel = new SaveLaterModel();
    saveLaterModel.user_id = this.userId;
    saveLaterModel.product_id = item.id;
    saveLaterModel.created_by = Constants.client;

    this.moveItemToSaveLaterSubscription = this.saveLaterSerice.moveCartItemToSaveLater(saveLaterModel)
      .subscribe(response => {

        if (response) {
          this.cartDetails.splice(index, 1);
          this.getSaveLaterItems(this.userId);
          this.calculateCartQuantity();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  moveItemToWishList(item: SaveLaterDetails, index: number) {
    const wishListModel = new WishListModel();
    wishListModel.user_id = this.userId;
    wishListModel.product_id = item.productId;
    wishListModel.created_by = Constants.client;

    this.moveItemToWishListSubscription = this.wishListService.moveItemToWishList(wishListModel)
      .subscribe(response => {

        if (response) {
          this.toastr.success('Item Successfully moved to WishList', 'Success');
          this.deleteItemFromSaveLaterList(item.id, index);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  deleteItemFromSaveLaterList(saveLaterId: number, index: number) {
    this.deleteItemFromSaveLaterSubscription = this.saveLaterSerice.deleteItemFromSaveLater(saveLaterId)
      .subscribe(response => {

        if (response) {
          this.saveLaterItems.splice(index, 1);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });

  }

  moveSaveItemToCart(item: SaveLaterDetails, index: number) {
    const cartModel = new CartModel();
    cartModel.user_id = this.userId;
    cartModel.product_id = item.productId;
    cartModel.quantity = 1;
    cartModel.created_by = Constants.client;
    this.moveSaveItemToCartSubscription = this.cartService.moveItemToCart(cartModel).subscribe(response => {

      if (response) {
        this.deleteItemFromSaveLaterList(item.id, index);
        this.getCartDetails(this.userId);
        this.toastr.success(`Item Successfully moved to Cart`, 'Success');
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

  navigateToProductDetailPage(productId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId }
    };

    const path = `${RoutePathConfig.Home}/${RoutePathConfig.ProductsDetail}`;

    this.router.navigate([path], navigationExtras);
  }

  placeOrder() {
    const orderModel = {
      order: {
        created_by: this.userId.toString(),
        user_id: this.userId,
        location: this.locationDetails,
        details: [],
        offer: [],
        product: []
      }
    };

    const checkOutOfStock = this.cartDetails.filter(x => x.left_qty === 0);

    if (checkOutOfStock && checkOutOfStock.length > 0) {
      this.toastr.warning('Please remove the out of stock item from the cart');
    } else {

      this.cartDetails.forEach(x => {

        const detaisModel = new OrderDetailsTableModel();
        detaisModel.created_by = this.userId.toString();
        detaisModel.price = x.price;
        detaisModel.qty = x.quantity;
        detaisModel.product_id = x.id;

        orderModel.order.details.push(detaisModel);

        const offerModel = new OrderOffersTableModel();
        offerModel.created_by = this.userId.toString();
        offerModel.offer_id = x.offer_id;

        orderModel.order.offer.push(offerModel);

        const product = new OrderProductModel();
        product.image = x.image;
        product.name = x.name;
        product.offer_id = x.offer_id;
        product.offer_name = x.offer_name;
        product.created_by = this.userId.toString();

        orderModel.order.product.push(product);
      });

      this.orderService.orderStorage = orderModel;
      const path = `${RoutePathConfig.Home}/${RoutePathConfig.PaymentMethod}`;
      this.router.navigate([path]);
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
    if (this.moveSaveItemToCartSubscription) {
      this.moveSaveItemToCartSubscription.unsubscribe();
    }
    if (this.getlocationDetailsSubscription) {
      this.getlocationDetailsSubscription.unsubscribe();
    }
    if (this.getlocationDetailsSubscription) {
      this.getlocationDetailsSubscription.unsubscribe();
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
  private getUserDetails(userId: number) {
    this.getlocationDetailsSubscription = this.orderService.getLocationDetails(userId).subscribe(response => {

      if (response) {
        this.locationDetails = response;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}

