import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from 'src/app/modules/home/modules/category/models/category.model';
import { ToastrService } from 'ngx-toastr';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {

  categoryId: number;
  categoryList: CategoryModel;
  getCategoriesSubscription: ISubscription;

  @Output() change = new EventEmitter();

  constructor(
    private categoryService: CategoryService,
    private toastr: ToastrService,
    private header: HeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  routeToProductList(event) {
    this.categoryId = event.target.value;

    this.header.emitCategoryId(this.categoryId);
    // this.router.navigate([RoutePathConfig.Products]);
    // this.change.emit(this.categoryId);
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { categoryId: this.categoryId },
      relativeTo: this.route
    };
    this.router.navigate([RoutePathConfig.Products], navigationExtras);
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

  navigateToLoginPage() {
    this.router.navigate([RoutePathConfig.Login]);
  }
  ngOnDestroy() {
    if (this.getCategoriesSubscription) {
      this.getCategoriesSubscription.unsubscribe();
    }
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
