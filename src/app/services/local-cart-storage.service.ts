import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalCartStorageService {
  public localCart = [];
  constructor() {}
  addToCartValues(prod) {
    debugger;
    this.localCart.push(prod);
  }
  getCartValues() {
    return this.localCart;
  }
}
