import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "./services/local-cart-storage.service";
import { LocalWhishListService } from "./services/local-whish-list.service";

@Component({
  selector: "app-cart-view",
  templateUrl: "./cart-view.component.html",
  styleUrls: ["./cart-view.component.css"],
})
export class CartViewComponent implements OnInit {
  cartView=[];
  quantity;
  cartItems=0;
  totalPrice=0;
  whishList=[];
  constructor(
    public locCart:LocalCartStorageService,
    public locWhishList:LocalWhishListService
    ) {}

  ngOnInit(): void {
    this.cartView=this.locCart.getCartValues();
    this.whishList=this.locWhishList.getWhishList();
    this.cartQuantityCal();
  }
  cartQuantityCal(){
    this.cartItems=0;
    this.totalPrice=0;
    for(var i=0;i<this.cartView.length;i++){
      this.cartItems=this.cartItems+this.cartView[i].cartQuant;
      this.totalPrice=this.totalPrice+parseInt(this.cartView[i].price)*this.cartView[i].cartQuant;
    }
  }
}
