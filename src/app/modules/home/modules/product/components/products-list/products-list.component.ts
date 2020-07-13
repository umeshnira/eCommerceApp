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
import { Image } from '../../models/product-image.model';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit, OnDestroy {

  categoryId: number;
  isUser: boolean;

  products: ProductDetailsModel[];
  result: CategoryTreeViewModel;
  field: Object;

  subCategoryListSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;
  deleteProductSubscription: ISubscription;

  constructor(
    private subCategoryService: SubCategoryService,
    private service: ProductService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const userRole = this.authService.getCookie();

    if (userRole === Constants.client) {
      this.isUser = true;
    }

    this.categoryId = this.route.snapshot.queryParams.categoryId;
    this.getSubCategoryList();
    this.getProductsByCategoryId(this.categoryId);
  }

  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
    this.getProductsByCategoryId(this.categoryId);
  }

  deleteProduct(productId: number) {
    this.deleteProductSubscription = this.service.deleteProduct(productId).subscribe(response => {

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  getProductImage(images: Array<Image>) {
    return images[0].path;
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
