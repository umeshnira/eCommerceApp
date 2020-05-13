import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "src/app/core/services/local-cart-storage.service";
import { HeaderService } from "./service/header.service";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  cartList = [];
  categoryList=[];
  constructor(
    public locCart: LocalCartStorageService,
    private hdService:HeaderService
    ) {}

  ngOnInit(): void {
    this.cartList = this.locCart.localCart;
    this.cartQuantityCal();
    this.categoryList=this.hdService.getCategories();
  }
  cartQuantityCal() {
    this.cartItems = 0;

    for (var i = 0; i < this.cartList.length; i++) {
      this.cartItems = this.cartItems +parseInt( this.cartList[i].cartQuant);
    }
  }
}
