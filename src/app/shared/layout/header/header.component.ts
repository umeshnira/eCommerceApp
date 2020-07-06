import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})

export class HeaderComponent implements OnInit, OnDestroy {

  cartItems = 0;
  typeId: any;
  cartList = [];
  categoryList = [];
  subscription: ISubscription;

  constructor(
    public locCart: LocalCartStorageService,
    private service: HeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.cartList = this.locCart.localCart;
    this.cartQuantityCal();
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

  cartQuantityCal() {

    this.cartItems = 0;

    for (let i = 0; i < this.cartList.length; i++) {
      // tslint:disable-next-line: radix
      this.cartItems = this.cartItems + parseInt(this.cartList[i].cartQuant);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private getCategories() {
    this.subscription = this.service.getCategories().subscribe((response) => {
      this.categoryList = response;
    },
      (error) => {
        console.log(error);
      });
  }
}
