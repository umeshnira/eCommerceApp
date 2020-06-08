import { Component, OnInit } from "@angular/core";
import { LocalCartStorageService } from "src/app/core/services/local-cart-storage.service";
import { HeaderService } from "./service/header.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  cartItems = 0;
  cartList = [];
  categoryList = [];
  typeId: any;

  constructor(
    public locCart: LocalCartStorageService,
    private service: HeaderService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cartList = this.locCart.localCart;
    this.cartQuantityCal();
    this.getCategories();
  }
  cartQuantityCal() {
    this.cartItems = 0;

    for (let i = 0; i < this.cartList.length; i++) {
      this.cartItems = this.cartItems + parseInt(this.cartList[i].cartQuant);
    }
  }

  getCategories() {
    this.service.getCategories().subscribe((response) => {
      this.categoryList = response;
    },
      (error) => {
        console.log(error);
      });
  }

  goToTreeView(event) {
    this.typeId = event.target.value;
    
    this.router.navigate(['/firstPage/productList'], {queryParams: {id: this.typeId}});
  }
}
