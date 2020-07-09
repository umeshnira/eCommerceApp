import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../../models/productList.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { element } from 'protractor';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  subCategoryList: any;
  subProductTypes: any;
  productTypes: any;
  products: any;
  result: any;
  productImage: string;
  productId: number;
  isUser: boolean;
  imageList: any[] = [];
  modelResult: Categories[] = [];
  field: Object;
  subCategoryListSubscription: ISubscription;
  getProductsSubscription: ISubscription;
  deleteProductSubscription: ISubscription;


  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {

    const userRole = this.authService.getCookie();
    if (userRole === Constants.client) {
      this.isUser = true;
    }
    this.productId = this.route.snapshot.queryParams.id;
    this.getSubCategoryList();
    this.getProducts(this.productId);
  }

  nodeclicked(event) {

    this.productId = event.node.dataset.uid;
    this.getProducts(this.productId);
  }

  deleteProduct(id) {

    this.deleteProductSubscription = this.service.deleteProduct(id).subscribe(response => {

    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });
  }

  goToEditPage(productId, categoryId) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: productId, categoryId: categoryId },
      relativeTo: this.route
    };
    this.router.navigate(['edit'], navigationExtras);
  }

  goToDetailPage(id) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: id },
      relativeTo: this.route
    };
    this.router.navigate(['details'], navigationExtras);
  }

  ngOnDestroy() {

    if (this.subCategoryListSubscription) {
      this.subCategoryListSubscription.unsubscribe();
    }
    if (this.getProductsSubscription) {
      this.getProductsSubscription.unsubscribe();
    }
    if (this.deleteProductSubscription) {
      this.deleteProductSubscription.unsubscribe();
    }
  }

  prepareProductsImage() {
      this.products.forEach(element => {
        this.imageList.push(element.images);
      });
  }

  private getProducts(productId) {

    this.getProductsSubscription = this.service.getProducts(productId).subscribe((response) => {

      this.products = response;

    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });

  }

  private getSubCategoryList() {

    this.subCategoryListSubscription = this.subCategoryService.getSubCategoriesByCategoryId(this.productId).subscribe(response => {
      this.result = response;
      this.field = { dataSource: this.result, id: 'id', text: 'name', child: 'subCategories' };
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });
  }

}
