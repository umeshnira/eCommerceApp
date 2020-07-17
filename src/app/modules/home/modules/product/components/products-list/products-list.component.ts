import { Component, OnInit, OnDestroy, Input, OnChanges } from '@angular/core';
import { SubscriptionLike as ISubscription, Subject, AsyncSubject, Observer } from 'rxjs';
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
import { HeaderService } from 'src/app/shared/services/header.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy, OnChanges {

  categoryId: number;
  userId: number;
  isUser: boolean;

  products: ProductDetailsModel[];
  result: CategoryTreeViewModel;
  field: Object;

  subCategoryListSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;
  deleteProductSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private authService: AuthService,
    private cartService: CartService,
    private header: HeaderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.header.getCategoryId().subscribe(res => {
      debugger;
        this.categoryId = res;
      });
      // this.getProductsByCategoryId(this.categoryId);

    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    const userRole = userDetails.role;
    if (userRole === Constants.client) {
      this.isUser = true;
    }

    this.categoryId = this.route.snapshot.queryParams.categoryId;
    this.getSubCategoryList();
    this.getProductsByCategoryId(this.categoryId);
  }

  ngOnChanges() {
    // console.log('hi');
    // this.header.getCategoryId().subscribe(res => {
    //   this.categoryId = res;
    // })
    // this.getProductsByCategoryId(this.categoryId);
  }

  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
    this.getProductsByCategoryId(this.categoryId);
  }

  deleteProduct(productId: number, index: number) {
    this.deleteProductSubscription = this.service.deleteProduct(productId).subscribe(response => {

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
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.service.getProductsByCategoryId(categoryId)
      .subscribe((response) => {

        this.products = response;
      },
        (error) => {
          this.toastr.error('', error.error.message);
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

}
