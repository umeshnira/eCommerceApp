import { Component, OnInit, OnDestroy } from '@angular/core';
import { FirstPageService } from 'src/app/modules/home/services/first-page.service';
import { SellerService } from 'src/app/shared/services/seller.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/shared/services/category.service';
import { SellerDetailsModel } from './models/seller-details.model';
import { CategoryModel } from './models/category.model';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductDetailsModel } from './models/product-details.model';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  userId: number;
  productList: ProductDetailsModel;
  sellersList: SellerDetailsModel;
  categoryList: CategoryModel;
  getAllSellersSubscription: ISubscription;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;

  constructor(
    private fps: FirstPageService,
    private sellerService: SellerService,
    private categoryService: CategoryService,
    private productService: ProductService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getAllSellers();
    this.getCategories();
    this.getProductsBySellerId();
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

  ngOnDestroy() {
    if (this.getAllSellersSubscription) {
      this.getAllSellersSubscription.unsubscribe();
    }
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
    this.getCategoriesSubscription = this.categoryService.getCategories().subscribe((response: CategoryModel) => {
      this.categoryList = response;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }



}
