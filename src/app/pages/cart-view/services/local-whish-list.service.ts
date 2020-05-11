import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalWhishListService {

  public localWhishLis = [];
  constructor() { }
  addToMyWhishList(prod) {

    this.localWhishLis.push(prod);
  }
  getWhishList() {
    return this.localWhishLis;
  }
}
