import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductDetailsModel } from 'src/app/modules/home/modules/product/models/product-details.model';
import { CategoryTreeViewModel } from 'src/app/modules/home/modules/category/models/category-tree-view.model';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Constants } from 'src/app/shared/models/constants';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { CategoryModel } from '../models/category.model';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
@Component({
  selector: 'app-dashboard-product-list',
  templateUrl: './dashboard-product-list.component.html',
  styleUrls: ['./dashboard-product-list.component.css']
})
export class DashboardProductListComponent implements OnInit, OnDestroy {
  categoryId: number;
  userId: number;
  userRole: String;
  isSeller: boolean;
  hasSubCategory: boolean;

  products: ProductDetailsModel[];
  result: CategoryTreeViewModel;
  field: Object;
  categoryList: CategoryModel[];

  subCategoryListSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;
  deleteProductSubscription: ISubscription;
  addProductToCartSubscription: ISubscription;
  changeInCategoryIdSubscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;
  getProductsSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private authService: AuthService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.loadProductsList();
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
    if (product.path) {
      return product.path;
    } else {
      return product.images[0].path;
    }

  }

  navigateToEditPage(productId: number, categoryId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId, categoryId: categoryId },
    };

    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.EditProducts}`;
    this.router.navigate([path], navigationExtras);
  }

  navigateToDetailPage(productId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId },
    };

    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.ProductsDetail}`;
    this.router.navigate([path], navigationExtras);
  }

  getCategoryId(event) {
    this.hasSubCategory = false;
    this.categoryId = Number(event.target.value);

    if (this.categoryId === 0) {
      this.loadProductsList();
    } else {
      this.getSubCategoryList();
      if (this.isSeller) {
        this.getProductsByCategoryId(this.categoryId);
      } else {
        this.getProductsByCategoryId(this.categoryId);
      }
    }

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
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.getProductsSubscription) {
      this.getProductsSubscription.unsubscribe();
    }
  }

  private getProductsByCategoryIdForSeller(response: ProductDetailsModel[]) {
    const productsList = response.filter(x => x.seller_id === this.userId);
    this.products = productsList;
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.productService.getProductsByCategoryId(categoryId)
      .subscribe((response) => {
        if (this.isSeller) {
          this.getProductsByCategoryIdForSeller(response);
        }
        this.products = response;
      },
        (error) => {
          this.toastr.warning('No Products are available in this Category', 'Sorry');
        });

  }

  private getSubCategoryList() {
    this.subCategoryListSubscription = this.subCategoryService.getSubCategoriesByCategoryId(this.categoryId)
      .subscribe(response => {
        this.result = response;
        this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
        this.hasSubCategory = true;
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  private getProductsBySellerId(userId: number) {
    this.getProductsBySellerIdSubscription = this.productService.getProductsBySellerId(this.userId)
      .subscribe((response) => {

        this.products = response;
      },
        (error) => {
          this.toastr.warning('No Products are available', 'Sorry');
        });
  }

  private getCategories() {
    this.getCategoriesSubscription = this.categoryService.getCategories().subscribe((response) => {
      this.categoryList = response;
      this.categoryList = this.categoryList.filter(x => x.parent_category_id === null);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }

  private getProducts() {
    this.getProductsSubscription = this.productService.getAllProducts()
      .subscribe((response) => {
        this.products = response;
      },
        (error) => {
          this.toastr.error('', error.error.message);
        }
      );
  }

  private loadProductsList() {
    if (this.userRole === Constants.seller) {
      this.isSeller = true;
      this.getCategories();
      this.getProductsBySellerId(this.userId);
    } else {
      this.getCategories();
      this.getProducts();
    }
  }


}
