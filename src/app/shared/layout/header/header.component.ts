import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {

  typeId: number;
  cartList = [];
  categoryList: CategoryModel;
  getCategoriesSubscription: ISubscription;

  constructor(
    public locCart: LocalCartStorageService,
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.cartList = this.locCart.localCart;
    this.getCategories();
  }

  routeToProductList(event) {
    this.typeId = event.target.value;
    this.router.navigate([RoutePathConfig.Products], { queryParams: { id: this.typeId }, relativeTo: this.route });
  }

  routeToWishListPage() {
    this.router.navigate([RoutePathConfig.WishList], { relativeTo: this.route });
  }

  routeToMyCartPage() {
    this.router.navigate([RoutePathConfig.Cart], { relativeTo: this.route });
  }

  routeToCreateCategory() {
    this.router.navigate([RoutePathConfig.CreateCategory], { relativeTo: this.route });
  }

  routeToCreateSubCategory() {
    this.router.navigate([RoutePathConfig.CreateSubCategory], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
  }

  private getCategories() {
    this.getCategoriesSubscription = this.categoryService.getCategories().subscribe((response) => {
      this.categoryList = response;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
      );
  }
}
