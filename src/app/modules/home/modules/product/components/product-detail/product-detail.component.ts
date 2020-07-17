import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDetailsModel } from '../../models/product-details.model';
import { CartModel } from '../../models/cart.model';
import { Constants } from 'src/app/shared/models/constants';
import { CartService } from 'src/app/modules/home/services/cart.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { AuthService } from 'src/app/core/services/auth.service';

declare var $: any;
declare var init_ExZoom_Container: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number;
  userId: number;
  productDetails = new ProductDetailsModel();
  getProductSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.productId = this.route.snapshot.queryParams.productId;
    this.getProductDetails(this.productId);
  }

  addProductToCart() {
    const cartModel = new CartModel();
    cartModel.user_id = this.userId;
    cartModel.product_id = this.productId;
    cartModel.quantity = 1;
    cartModel.created_by = Constants.client;
    this.addProductToCartSubscription = this.cartService.addProductToCart(cartModel).subscribe(response => {

      if (response) {
        this.toastr.success('Product Added to Cart Successfully', 'Success');
        this.router.navigate([RoutePathConfig.Home]);
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  ngOnDestroy() {
    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
    if (this.addProductToCartSubscription) {
      this.addProductToCartSubscription.unsubscribe();
    }
  }

  private getProductDetails(productId: number) {
    this.getProductSubscription = this.productService.getProductDetails(productId).subscribe((response: ProductDetailsModel) => {
      this.productDetails = response;
      init_ExZoom_Container();
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}
