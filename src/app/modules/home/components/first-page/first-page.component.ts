import { Component, OnInit, Input } from '@angular/core';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { LocalCartStorageService } from 'src/app/shared/services/local-cart-storage.service';
import { FirstPageService } from '../../services/first-page.service';
import { LocalWhishListService } from '../../services/local-whish-list.service';

@Component({
  selector: 'app-first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.css'],
})

export class FirstPageComponent implements OnInit {

  prodList;
  cartItems = 0;
  cartList = [];
  @Input() header: HeaderComponent;

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

  cartQuantityCal() {

    this.header.cartQuantityCal();
  }
}
