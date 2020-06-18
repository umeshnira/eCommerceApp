import { Injectable } from '@angular/core';

@Injectable()

export class LocalWhishListService {

  public localWhishLis = [];

  constructor() { }

  addToMyWhishList(prod) {

    this.localWhishLis.push(prod);
  }

  getWhishList() {

    return this.localWhishLis;
  }

  deleteWhishListItem(productID) {

    for (let i = 0; i < this.localWhishLis.length; i++) {
      if (this.localWhishLis[i].productID === productID) {
        this.localWhishLis.splice(i, 1);
        break;
      }
    }
    return this.localWhishLis;
  }
}
