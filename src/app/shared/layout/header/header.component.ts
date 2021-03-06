import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { GenericStateManagerService } from '../../services/generic-state-manager.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {

  categoryId: number;
  categoryList: CategoryModel[];
  getCategoriesSubscription: ISubscription;

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private genericService: GenericStateManagerService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  routeToProductList(event) {
    this.categoryId = event.target.value;

    const currentRoute = this.router.url;

    if (currentRoute.substring(0, 25) !== `/${RoutePathConfig.Home}/${RoutePathConfig.Products}?categoryId`) {

      let navigationExtras: NavigationExtras;
      navigationExtras = {
        queryParams: { categoryId: this.categoryId },
        relativeTo: this.route
      };
      this.router.navigate([RoutePathConfig.Products], navigationExtras);

    } else {
      this.genericService.emitCategoryId(this.categoryId);
    }

  }

  routeToProductPage() {
    this.router.navigate([RoutePathConfig.CreateProducts], { relativeTo: this.route });
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

  routeToOrderPage() {
    this.router.navigate([RoutePathConfig.Order], { relativeTo: this.route });
  }

  routeToMyWishListPage() {
    this.router.navigate([RoutePathConfig.WishList], { relativeTo: this.route });
  }

  navigateToLoginPage() {
    this.router.navigate([RoutePathConfig.Login]);
  }
  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
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
