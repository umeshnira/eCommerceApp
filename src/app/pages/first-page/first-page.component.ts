import { Component, OnInit ,Input} from "@angular/core";
import { FirstPageService } from "./services/first-page.service";
import { LocalCartStorageService } from "../../core/services/local-cart-storage.service";
import { LocalWhishListService } from "../cart-view/services/local-whish-list.service";
import {HeaderComponent  } from "../../shared/header/header.component";
@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.css"],
})
export class FirstPageComponent implements OnInit {
  @Input() header:HeaderComponent;
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
  cartQuantityCal() {
    debugger;
    // this.cartItems = 0;

    // for (var i = 0; i < this.cartList.length; i++) {
    //   this.cartItems = this.cartItems +parseInt( this.cartList[i].cartQuant);
    // }
    this.header.cartQuantityCal();
  }
}
