import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HeaderService } from '../../services/header.service';
import { SubscriptionLike as ISubscription } from 'rxjs';


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

  goToSubProductList(event) {

    this.typeId = event.target.value;
    this.router.navigate(['/product/productList'], { queryParams: { id: this.typeId } });
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
