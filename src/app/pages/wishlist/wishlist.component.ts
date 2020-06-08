import { Component, OnInit } from "@angular/core";
import { LocalWhishListService } from "./service/local-whish-list.service"
import { LocalCartStorageService } from "../../core/services/local-cart-storage.service";

@Component({
  selector: "app-wishlist",
  templateUrl: "./wishlist.component.html",
  styleUrls: ["./wishlist.component.css"],
})
export class WishlistComponent implements OnInit {
  wishList = [];

  constructor(
    public locCart: LocalCartStorageService,
    public wishListSer: LocalWhishListService
  ) { }

  ngOnInit(): void {
    this.getWhishList();
   }
  ngAfterViewInit() {
    this.loadScript("assets/products/js/jquery-2.1.4.min.js");
    this.loadScript("assets/products/js/carousel.js");

   
  }

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  getWhishList() {
    this.wishList = this.wishListSer.getWhishList();
  }
  addToCart(prod){
    this.locCart.addToCartValues(prod);
  }
  removeWishList(productID){
    this.wishListSer.deleteWhishListItem(productID);
  }
}
