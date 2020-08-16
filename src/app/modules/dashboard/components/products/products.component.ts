import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellerService } from 'src/app/shared/services/seller.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SellerDetailsModel } from './models/seller-details.model';
import { CategoryModel } from './models/category.model';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductDetailsModel } from './models/product-details.model';
import { Constants } from 'src/app/shared/models/constants';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CategoryTreeViewModel } from './models/category-tree-view.model';
import { Status } from 'src/app/shared/enums/user-status.enum';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  userId: number;
  categoryId: number;
  sellerId: number;
  userRole: string;
  isSeller: boolean;
  hasSubCategory: boolean;
  isOfferList: boolean;

  productList: ProductDetailsModel[];
  sellersList: SellerDetailsModel[];
  categoryList: CategoryModel[];
  field: Object;
  result: CategoryTreeViewModel;

  getAllSellersSubscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;
  topRatedProductsSubscription: ISubscription;
  deleteProductSubscription: ISubscription;
  subCategoryListSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;

  constructor(
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private subCategoryService: SubCategoryService,
    private productService: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.getAllSellers();
    this.getCategories();
    this.loadDefaultProductsList();
    this.isOfferList = this.route.snapshot.queryParams.offerList;

  }

  getCategoryId(event) {
    this.hasSubCategory = false;
    this.categoryId = Number(event.target.value);
    if (this.categoryId !== 0) {
      this.getSubCategoryList();
    }

  }

  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
  }

  getSellerId(event) {
    this.sellerId = Number(event.target.value);
  }

  getProductsBySellerId() {
    this.getProductsBySellerIdSubscription = this.productService.getProductsBySellerId(this.userId)
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.warning('No Products are available', 'Sorry');
        });
  }

  getImage(products) {
    if (products.path) {
      return products.path;
    }
    if (products.images.length > 0) {
      return products.images[0].path;
    }
  }

  navigateToEditPage(productId: number, categoryId: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId, categoryId: categoryId },
      relativeTo: this.route
    };

    this.router.navigate(['edit'], navigationExtras);
  }

  navigateToViewPage(productId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId },
      relativeTo: this.route
    };

    this.router.navigate(['details'], navigationExtras);
  }

  deleteProduct(productId: number, index: number) {
    this.deleteProductSubscription = this.productService.deleteProduct(productId).subscribe(response => {

      this.productList.splice(index, 1);
      this.toastr.success('Deleted Product Successfully', 'Success');
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  searchTopSellingProducts() {
    if (this.categoryId === 0) {
      this.loadDefaultProductsList();
    } else {
      this.getProductsByCategoryId(this.categoryId);
    }
  }

  ngOnDestroy() {
    if (this.getAllSellersSubscription) {
      this.getAllSellersSubscription.unsubscribe();
    }
    if (this.topRatedProductsSubscription) {
      this.topRatedProductsSubscription.unsubscribe();
    }
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.getProductsBySellerIdSubscription) {
      this.getProductsBySellerIdSubscription.unsubscribe();
    }
    if (this.subCategoryListSubscription) {
      this.subCategoryListSubscription.unsubscribe();
    }
    if (this.getProductsByCategoryIdSubscription) {
      this.getProductsByCategoryIdSubscription.unsubscribe();
    }
  }

  private getTopRatedProducts() {
    this.topRatedProductsSubscription = this.productService.getAllProducts()
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.warning('No Products are Available', 'Sorry');
        });
  }

  private getAllSellers() {
    this.getAllSellersSubscription = this.sellerService.getAllSellers()
      .subscribe(response => {

        if (response) {
          this.sellersList = response;
          this.sellersList = this.sellersList.filter(x => x.status === Status.Active);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
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

  private loadDefaultProductsList() {
    if (this.userRole === Constants.seller) {
      this.isSeller = true;
      this.getProductsBySellerId();
    } else {
      this.getTopRatedProducts();
    }
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.productService.getProductsByCategoryId(categoryId)
      .subscribe((response) => {
        if (this.sellerId) {
          this.getProductsByCategoryIdForSeller(response);
        } else {
          this.productList = response;
        }
      },
        (error) => {
          this.toastr.warning('No Products are Available', 'Sorry');
        });

  }

  private getProductsByCategoryIdForSeller(response: ProductDetailsModel[]) {
    const productsList = response.filter(x => x.seller_id === this.sellerId);
    this.productList = productsList;
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


}
