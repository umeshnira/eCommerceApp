import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/layout/header/header.component';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { FirstPageService } from '../../services/first-page.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})

export class HomePageComponent implements OnInit {

  prodList;
  cartItems = 0;
  cartList = [];

  constructor(
    private fps: FirstPageService,
    public locCart: LocalCartStorageService,
    public locWhishList: LocalWhishListService
  ) { }

  ngOnInit(): void {

    this.prodList = this.fps.loadRandomProductsList;
    this.cartList = this.locCart.localCart;
  }

  addTocart(prod) {

    this.locCart.addToCartValues(prod);
  }

  addWhishList(prod) {

    this.locWhishList.addToMyWhishList(prod);
  }

 
}
