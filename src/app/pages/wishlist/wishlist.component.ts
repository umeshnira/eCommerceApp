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
    this.loadScript("assets/products/js/jquery-ui.js");
    this.loadScript("assets/products/js/easyResponsiveTabs.js");
    this.loadScript("assets/products/js/creditly.js");
    this.loadScript("assets/products/js/SmoothScroll.min.js");
    this.loadScript("assets/products/js/move-top.js");
    this.loadScript("assets/products/js/easing.js");
    this.loadScript("assets/products/js/imagezoom.js");
    this.loadScript("assets/products/js/jquery.flexisel.js");
    this.loadScript("assets/products/js/jquery.flexslider.js");
    this.loadScript("assets/products/js/bootstrap.js");
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
    debugger;
    this.wishList = this.wishListSer.getWhishList();
  }
  addToCart(prod){
    this.locCart.addToCartValues(prod);
  }
  removeWishList(productID){
    this.wishListSer.deleteWhishListItem(productID);
  }
}
