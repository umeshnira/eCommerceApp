import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LocalWhishListService } from '../../services/local-whish-list.service';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})

export class WishlistComponent implements OnInit {

  wishList = [];

  @Input() header: HeaderComponent;

  constructor(
    public locCart: LocalCartStorageService,
    public wishListSer: LocalWhishListService
  ) { }

  ngOnInit(): void {

    this.getWhishList();
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

}
