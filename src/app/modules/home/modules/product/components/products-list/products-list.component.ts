import { Component, OnInit, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductDetailsModel } from '../../models/product-details.model';
import { CategoryTreeViewModel } from '../../../category/models/category-tree-view.model';
import { CartModel } from '../../models/cart.model';
import { CartService } from 'src/app/modules/home/services/cart.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { GenericStateManagerService } from 'src/app/shared/services/generic-state-manager.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})

export class ProductsListComponent implements OnInit, OnDestroy {

  categoryId: number;
  userId: number;
  userRole: string;
  isUser: boolean;

  products: ProductDetailsModel[];
  result: CategoryTreeViewModel;
  field: Object;

  subCategoryListSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;
  deleteProductSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;
  changeInCategoryIdSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private genericService: GenericStateManagerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // const userDetails = this.authService.getUserDetailsFromCookie();
    // this.userId = userDetails.user_id;
    // this.userRole = userDetails.role;
    // this.changeInCategoryId();
    // this.categoryId = this.route.snapshot.queryParams.categoryId;
    // this.getSubCategoryList();
    // if (this.userRole === Constants.client) {
    //   this.isUser = true;
    //   this.getProductsByCategoryId(this.categoryId);
    // }
    // if (this.userRole === Constants.seller) {
    //   this.getProductsBySellerId();
    // }
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
  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
    this.getProductsByCategoryId(this.categoryId);
  }

  deleteProduct(productId: number, index: number) {
    this.deleteProductSubscription = this.productService.deleteProduct(productId).subscribe(response => {

      this.products.splice(index, 1);
      this.toastr.success('Deleted Product Successfully', 'Success');
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  getProductImage(product) {
    return product.path;
  }

  addProductToCart(productId: number) {
    const cartModel = new CartModel();
    cartModel.user_id = this.userId;
    cartModel.product_id = productId;
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

  navigateToEditPage(productId: number, categoryId: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId, categoryId: categoryId },
      relativeTo: this.route
    };

    this.router.navigate(['edit'], navigationExtras);
  }

  navigateToDetailPage(productId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId },
      relativeTo: this.route
    };

    this.router.navigate(['details'], navigationExtras);
  }

  ngOnDestroy() {
    if (this.subCategoryListSubscription) {
      this.subCategoryListSubscription.unsubscribe();
    }
    if (this.getProductsByCategoryIdSubscription) {
      this.getProductsByCategoryIdSubscription.unsubscribe();
    }
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
    if (this.addProductToCartSubscription) {
      this.addProductToCartSubscription.unsubscribe();
    }
    if (this.changeInCategoryIdSubscription) {
      this.changeInCategoryIdSubscription.unsubscribe();
    }
    if (this.getProductsBySellerIdSubscription) {
      this.getProductsBySellerIdSubscription.unsubscribe();
    }
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.productService.getProductsByCategoryId(categoryId)
      .subscribe((response) => {

        if (response) {
          if (this.isUser) {
            this.products = response;
          } else {
            this.getProductsByCategoryIdForSeller(response);
          }
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });

  }

  private getProductsByCategoryIdForSeller(response: ProductDetailsModel[]) {
    const productsList = response.filter(x => x.seller_id === this.userId);
    this.products = productsList;
  }

  private changeInCategoryId() {
    this.changeInCategoryIdSubscription = this.genericService.categoryIdChanged.subscribe((res: number) => {
      this.categoryId = res;
      this.getSubCategoryList();
      this.getProductsByCategoryId(this.categoryId);
    });
  }

  private getSubCategoryList() {
    this.subCategoryListSubscription = this.subCategoryService.getSubCategoriesByCategoryId(this.categoryId)
      .subscribe(response => {
        this.result = response;
        this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  private getProductsBySellerId() {
    this.getProductsBySellerIdSubscription = this.productService.getProductsBySellerId(this.userId)
      .subscribe((response) => {

        this.products = response;
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

}
