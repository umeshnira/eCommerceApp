import { Component, OnInit } from "@angular/core";
import { FirstPageService } from "./services/first-page.service";
import { LocalCartStorageService } from "../../core/services/local-cart-storage.service";
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
    this.cartQuantityCal();
  }
  ngAfterViewInit() {
    this.loadScript("assets/products/js/jquery-2.1.4.min.js");
    this.loadScript("assets/products/js/jquery.magnific-popup.js");
    this.loadScript("assets/products/js/minicart.js");
    this.loadScript("assets/products/js/jquery-ui.js");
    this.loadScript("assets/products/js/carousel.js");
    this.loadScript("assets/products/js/jquery.flexisel.js");
    this.loadScript("assets/products/js/SmoothScroll.min.js");
    this.loadScript("assets/products/js/move-top.js");
    this.loadScript("assets/products/js/easing.js");

    this.loadScript("assets/products/js/bootstrap.js");
  }

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  addTocart(prod) {
    this.locCart.addToCartValues(prod);
  }
  addWhishList(prod) {
    this.locWhishList.addToMyWhishList(prod);
  }
  cartQuantityCal() {
    this.cartItems = 0;

    for (var i = 0; i < this.cartList.length; i++) {
      this.cartItems = this.cartItems +parseInt( this.cartList[i].cartQuant);
    }
  }
}
