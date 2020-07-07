import { Component, OnInit, OnDestroy } from '@angular/core';
import { Categories } from '../../models/productList.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubCategoryService } from '../../services/sub-category.service';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

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
  id: any;
  isUser: boolean;
  modelResult: Categories[] = [];
  field: Object;
  subCategoryListSubscription: ISubscription;
  getProductsSubscription: ISubscription;
  deleteProductSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
   
    // if (this.route.snapshot.url[0].path === 'user') {
    //   this.isUser = true;
    // }
    this.id = this.route.snapshot.queryParams.id;
    this.getSubCategoryList();
    this.getProducts(this.id);
  }

  nodeclicked(event) {

    this.id = event.node.dataset.uid;
    this.getProducts(this.id);
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

  goToEditPage(id, categoryId) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: id, categoryId: categoryId },
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
    this.router.navigate(['user/view'], navigationExtras);
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

  private getProducts(id) {

    this.getProductsSubscription = this.service.getProducts(id).subscribe((response) => {

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

    this.subCategoryListSubscription = this.subCategoryService.getSubCategoriesByCategoryId(this.id).subscribe(response => {
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
