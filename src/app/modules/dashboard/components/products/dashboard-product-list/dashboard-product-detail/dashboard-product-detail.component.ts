import { Component, OnInit } from '@angular/core';
import { ProductDetailsModel } from 'src/app/modules/home/modules/product/models/product-details.model';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { CartService } from 'src/app/modules/home/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartModel } from 'src/app/modules/home/modules/product/models/cart.model';
import { Constants } from 'src/app/shared/models/constants';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { SubscriptionLike as ISubscription } from 'rxjs';
declare var $: any;
declare var init_ExZoom_Container: any;
@Component({
  selector: 'app-dashboard-product-detail',
  templateUrl: './dashboard-product-detail.component.html',
  styleUrls: ['./dashboard-product-detail.component.css']
})
export class DashboardProductDetailComponent implements OnInit {
  productId: number;
  userId: number;
  outOfStock: boolean;
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
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
  ngAfterViewInit() {
    this.loadScript('assets/Home/js/slick.min.js');
    this.loadScript('assets/Home/js/nouislider.min.js');
    this.loadScript('assets/Home/js/jquery.zoom.min.js');
    this.loadScript('assets/Home/js/main.js');
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
      this.checkStock();
      init_ExZoom_Container();
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  private checkStock() {
    if (this.productDetails.left_qty === 0) {
      this.outOfStock = true;
    }
  }

}
