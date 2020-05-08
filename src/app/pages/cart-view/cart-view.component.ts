import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "src/app/services/local-cart-storage.service";

@Component({
  selector: "app-cart-view",
  templateUrl: "./cart-view.component.html",
  styleUrls: ["./cart-view.component.css"],
})
export class CartViewComponent implements OnInit {
  cartView = [];
  quantity;
  cartItems = 0;
  totalPrice = 0;
  constructor(public locCart: LocalCartStorageService) {}

  ngOnInit(): void {
    this.cartView = this.locCart.getCartValues();
    this.cartQuantityCal();
  }
  cartQuantityCal() {
    this.cartItems = 0;
    this.totalPrice = 0;
    for (var i = 0; i < this.cartView.length; i++) {
      this.cartItems = this.cartItems + this.cartView[i].cartQuant;
      this.totalPrice =
        this.totalPrice +
        parseInt(this.cartView[i].price) * this.cartView[i].cartQuant;
    }
  }
}
