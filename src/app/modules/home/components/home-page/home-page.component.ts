import { Component, OnInit, Input } from '@angular/core';
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
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    })
  }
  ngAfterViewInit() {
    this.loadScript('assets/Home/js/slick.min.js');
    this.loadScript('assets/Home/js/nouislider.min.js');
    this.loadScript('assets/Home/js/jquery.zoom.min.js');
    this.loadScript('assets/Home/js/main.js');
  }
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
