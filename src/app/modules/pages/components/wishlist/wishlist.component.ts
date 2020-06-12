import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { LocalCartStorageService } from '../../../../shared/services/local-cart-storage.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';

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
