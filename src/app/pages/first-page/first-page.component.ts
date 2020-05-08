import { Component, OnInit } from "@angular/core";
import { FirstPageService } from "src/app/services/first-page.service";
import { LocalCartStorageService } from "src/app/services/local-cart-storage.service";
import { LocalWhishListService } from "../../services/local-whish-list.service";
@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.css"],
})
export class FirstPageComponent implements OnInit {
  prodList;
  cartItems=0;
  cartList=[];
  constructor(
    private fps: FirstPageService,
    public locCart: LocalCartStorageService,
    public locWhishList:LocalWhishListService
  ) {}

  ngOnInit(): void {
    this.prodList=this.fps.loadRandomProductsList;
    this.cartList=this.locCart.localCart;
    this.cartQuantityCal();
  }
  addTocart(prod){

    this.locCart.addToCartValues(prod);
    
  }
  addWhishList(prod){

    this.locWhishList.addToMyWhishList(prod);
    
  }
  cartQuantityCal(){
    this.cartItems=0;

    for(var i=0;i<this.cartList.length;i++){
      this.cartItems=this.cartItems+this.cartList[i].cartQuant;

    }
  }
}
