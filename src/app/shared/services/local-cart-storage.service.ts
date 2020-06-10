import { Injectable } from '@angular/core';

@Injectable()

export class LocalCartStorageService {

  public localCart = [];

  constructor() { }

  addToCartValues(prod) {

    this.localCart.push(prod);
  }

  getCartValues() {

    return this.localCart;
  }

  deleteCartItem(productID) {

    for (let i = 0; i < this.localCart.length; i++) {
      if (this.localCart[i].productID === productID) {
        this.localCart.splice(i, 1);
        break;
      }
    }
    return this.localCart;
  }

}
