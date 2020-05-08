import { Component, OnInit } from "@angular/core";
import { FirstPageService } from "src/app/services/first-page.service";
import { LocalCartStorageService } from "src/app/services/local-cart-storage.service";
@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.css"],
})
export class FirstPageComponent implements OnInit {
  prodList;
  constructor(
    private fps: FirstPageService,
    public locCart: LocalCartStorageService
  ) {}

  ngOnInit(): void {
    this.prodList = this.fps.loadRandomProductsList;
  }
  addTocart(prod) {
    debugger;
    this.locCart.addToCartValues(prod);
  }
}
