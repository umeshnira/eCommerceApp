import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { CategoryTreeViewModel } from '../../models/category-tree-view.model';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { Constants } from 'src/app/shared/models/constants';
import { ProductDetailsModel } from '../../models/product-details.model';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];
@Component({
  selector: 'app-assign-product',
  templateUrl: './assign-product.component.html',
  styleUrls: ['./assign-product.component.css']
})
export class AssignProductComponent implements OnInit, OnDestroy {

  userId: number;
  categoryId: number;
  userRole: string;
  isSeller: boolean;
  categories: CategoryTreeViewModel[];
  productList: ProductDetailsModel[];
  field: Object;
  getCategoriesSubscription: ISubscription;
  getProductsBySellerIdSubscription: ISubscription;
  getAllProductsSubscription: ISubscription;
  getProductsByCategoryIdSubscription: ISubscription;

  constructor(
    private productService: ProductService,
    private subCategoryService: SubCategoryService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.getCategories();
    this.loadDefaultProductsList();
  }

  categoryNodeclicked(event) {
    this.categoryId = event.node.dataset.uid;
    this.getProductsByCategoryId(this.categoryId);
  }

  getProductImage(product) {
    if (product.path) {
      return product.path;
    } else {
      return product.images[0].path;
    }

  }

  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
    if (this.getProductsByCategoryIdSubscription) {
      this.getProductsByCategoryIdSubscription.unsubscribe();
    }
    if (this.getProductsBySellerIdSubscription) {
      this.getProductsBySellerIdSubscription.unsubscribe();
    }
    if (this.getAllProductsSubscription) {
      this.getAllProductsSubscription.unsubscribe();
    }
  }

  private getProductsByCategoryIdForSeller(response: ProductDetailsModel[]) {
    const productsList = response.filter(x => x.seller_id === this.userId);
    this.productList = productsList;
  }

  private getProductsByCategoryId(categoryId: number) {
    this.getProductsByCategoryIdSubscription = this.productService.getProductsByCategoryId(categoryId)
      .subscribe((response) => {
        if (this.isSeller) {
          this.getProductsByCategoryIdForSeller(response);
        }
        this.productList = response;
      },
        (error) => {
          this.toastr.warning('No Products are available in this Category', 'Sorry');
        });

  }

  private getCategories() {
    this.getCategoriesSubscription = this.subCategoryService.getSubCategoriesTree().subscribe(response => {
      if (response) {
        this.categories = response;
        this.field = { dataSource: this.categories, id: 'id', text: 'name', child: 'subCategories' };
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }

  private loadDefaultProductsList() {
    if (this.userRole === Constants.seller) {
      this.isSeller = true;
      this.getProductsBySellerId();
    } else {
      this.getAllProducts();
    }
  }

  private getProductsBySellerId() {
    this.getProductsBySellerIdSubscription = this.productService.getProductsBySellerId(this.userId)
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.warning('No Products are available', 'Sorry');
        });
  }

  private getAllProducts() {
    this.getAllProductsSubscription = this.productService.getAllProducts()
      .subscribe((response) => {

        this.productList = response;
      },
        (error) => {
          this.toastr.warning('No Products are Available', 'Sorry');
        });
  }


}
