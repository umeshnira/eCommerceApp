import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.loadScript("assets/products/js/jquery-2.1.4.min.js");
    this.loadScript("assets/products/js/jquery.magnific-popup.js");
    this.loadScript("assets/products/js/carousel.js");
    this.loadScript("assets/products/js/minicart.js");
    this.loadScript("assets/products/js/jquery-ui.js");
    this.loadScript("assets/products/js/jquery.flexisel.js");
    this.loadScript("assets/products/js/SmoothScroll.min.js");
    this.loadScript("assets/products/js/move-top.js");
    this.loadScript("assets/products/js/easing.js");
    this.loadScript("assets/products/js/bootstrap.js");
  }

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement("script");
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
}
