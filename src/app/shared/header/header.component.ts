import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "src/app/pages/cart-view/services/local-cart-storage.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  cartList = [];
  constructor(public locCart: LocalCartStorageService) {}

  ngOnInit(): void {
    this.cartList = this.locCart.localCart;
    this.cartQuantityCal();
  }
  cartQuantityCal() {
    this.cartItems = 0;

    for (var i = 0; i < this.cartList.length; i++) {
      this.cartItems = this.cartItems + this.cartList[i].cartQuant;
    }
  }
}
