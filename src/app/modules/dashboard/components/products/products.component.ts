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

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  userId: number;
  isSeller: boolean;
  productList: ProductDetailsModel[];
  sellersList: SellerDetailsModel;
  categoryList: CategoryModel[];

  getAllSellersSubscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;
  topRatedProductsSubscription: ISubscription;
  deleteProductSubscription: ISubscription;

  constructor(
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    const userRole = userDetails.role;
    this.getAllSellers();
    this.getCategories();
    if (userRole === Constants.seller) {
      this.isSeller = true;
      this.getProductsBySellerId();
    }
    if (userRole === Constants.admin) {
      this.getTopRatedProducts();
    }

  }

  getProductsBySellerId() {
    this.getProductsBySellerIdSubscription = this.productService.getProductsBySellerId(this.userId)
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.error('', error.error.message);
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
  }

  private getTopRatedProducts() {
    this.topRatedProductsSubscription = this.productService.getAllProducts()
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  private getAllSellers() {
    this.getAllSellersSubscription = this.sellerService.getAllSellers()
      .subscribe(response => {

        if (response) {
          this.sellersList = response;
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



}
