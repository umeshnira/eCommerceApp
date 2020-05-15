import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "../../core/services/local-cart-storage.service";
import { LocalWhishListService } from "../wishlist/service/local-whish-list.service";
import { SaveForLaterService } from "../cart-view/services/save-for-later.service";
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
 saveLaterList=[];
  constructor(
    public locCart:LocalCartStorageService,
    public locWhishList:LocalWhishListService,
    public saveLate:SaveForLaterService
    ) {}

  ngOnInit(): void {
    this.cartView=this.locCart.getCartValues();
    this.saveLaterList=this.saveLate.getLaterList();
    this.cartQuantityCal();
  }

  cartQuantityCal(){
    this.cartItems=0;
    this.totalPrice=0;
   
    for(var i=0;i<this.cartView.length;i++){
      this.cartItems=this.cartItems+parseInt(this.cartView[i].cartQuant);
      this.totalPrice=this.totalPrice+parseInt(this.cartView[i].price)*parseInt(this.cartView[i].cartQuant);
    }
  }
  removeCartItem(productID){
    this.cartView= this.locCart.deleteCartItem(productID);
    this.cartQuantityCal();
  }
  addSaveLaterList(prod){

    this.saveLate.addToMylaterList(prod);
    this.cartQuantityCal();
  }
  addTocart(prod){

    this.locCart.addToCartValues(prod);
    this.cartQuantityCal();
    
  }
  deletesaveLaterList(productID){
    this.saveLate.deleteLaterListItem(productID);
  }
}
