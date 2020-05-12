import { Component, OnInit } from "@angular/core";
import { FirstPageService } from "./services/first-page.service";
import { LocalCartStorageService } from "../cart-view/services/local-cart-storage.service";
import { LocalWhishListService } from "../cart-view/services/local-whish-list.service";
@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.css"],
})
export class FirstPageComponent implements OnInit {
  prodList;
  cartItems = 0;
  cartList = [];
  constructor(
    private fps: FirstPageService,
    public locCart: LocalCartStorageService,
    public locWhishList: LocalWhishListService
  ) {}

  ngOnInit(): void {
    this.prodList = this.fps.loadRandomProductsList;
    this.cartList = this.locCart.localCart;
  }
  addTocart(prod) {
    this.locCart.addToCartValues(prod);
  }
  addWhishList(prod) {
    this.locWhishList.addToMyWhishList(prod);
  }

}
