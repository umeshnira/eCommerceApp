import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LocalCartStorageService } from '../../../../shared/services/local-cart-storage.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})

export class WishlistComponent implements OnInit, AfterViewInit {

  wishList = [];

  constructor(
    public locCart: LocalCartStorageService,
    public wishListSer: LocalWhishListService
  ) { }

  ngOnInit(): void {

    this.getWhishList();
  }

  ngAfterViewInit() {

    this.loadScript('assets/products/js/jquery-2.1.4.min.js');
    this.loadScript('assets/products/js/carousel.js');
  }

  getWhishList() {

    this.wishList = this.wishListSer.getWhishList();
  }

  addToCart(prod) {

    this.locCart.addToCartValues(prod);
  }

  removeWishList(productID) {

    this.wishListSer.deleteWhishListItem(productID);
  }

  private loadScript(scriptUrl: string) {

    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
