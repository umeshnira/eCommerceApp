import { Component, OnInit } from '@angular/core';
import { ProductDetailsModel } from 'src/app/modules/home/modules/product/models/product-details.model';
import { CategoryTreeViewModel } from 'src/app/modules/home/modules/category/models/category-tree-view.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { CartService } from 'src/app/modules/home/services/cart.service';
import { GenericStateManagerService } from 'src/app/shared/services/generic-state-manager.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Constants } from 'src/app/shared/models/constants';
import { CartModel } from 'src/app/modules/home/modules/product/models/cart.model';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { SubscriptionLike as ISubscription } from 'rxjs';
@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css']
})
export class DashboardProductListComponent implements OnInit {
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
  changeInCategoryIdSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private authService: AuthService,
    private genericService: GenericStateManagerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    const userRole = userDetails.role;
    if (userRole === Constants.client) {
      this.isUser = true;
    }

    this.changeInCategoryId();
    this.categoryId = this.route.snapshot.queryParams.categoryId;
    this.getSubCategoryList();
    this.getProductsByCategoryId(this.categoryId);
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


}