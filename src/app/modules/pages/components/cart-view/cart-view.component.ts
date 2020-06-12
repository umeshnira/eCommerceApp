import { Component, OnInit, Input } from '@angular/core';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';
import { SaveForLaterService } from '../../services/save-for-later.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css'],
})

export class CartViewComponent implements OnInit {

  quantity;
  cartItems = 0;
  totalPrice = 0;
  saveLaterList = [];
  cartView = [];

  @Input() header: HeaderComponent;

  constructor(
    public locCart: LocalCartStorageService,
    public locWhishList: LocalWhishListService,
    public saveLate: SaveForLaterService
  ) { }

  ngOnInit(): void {

    this.cartView = this.locCart.getCartValues();
    this.saveLaterList = this.saveLate.getLaterList();
    this.cartQuantityCal();
  }

  cartQuantityCal() {

    this.cartItems = 0;
    this.totalPrice = 0;

    for (let i = 0; i < this.cartView.length; i++) {
      // tslint:disable-next-line: radix
      this.cartItems = this.cartItems + parseInt(this.cartView[i].cartQuant);
      // tslint:disable-next-line: radix
      this.totalPrice = this.totalPrice + parseInt(this.cartView[i].price) * parseInt(this.cartView[i].cartQuant);
    }
  }

  removeCartItem(productID) {

    this.cartView = this.locCart.deleteCartItem(productID);
    this.cartQuantityCal();
  }

  addSaveLaterList(prod) {

    this.saveLate.addToMylaterList(prod);
    this.cartQuantityCal();
  }

  addTocart(prod) {

    this.locCart.addToCartValues(prod);
    this.cartQuantityCal();
  }

  deletesaveLaterList(productID) {

    this.saveLate.deleteLaterListItem(productID);
  }
}
