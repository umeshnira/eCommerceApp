import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"],
})
export class ProductDetailComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.loadScript("assets/products/js/jquery-2.1.4.min.js");
    this.loadScript("assets/products/js/jquery-ui.js");
    this.loadScript("assets/products/js/easyResponsiveTabs.js");
    this.loadScript("assets/products/js/creditly.js");
    this.loadScript("assets/products/js/SmoothScroll.min.js");
    this.loadScript("assets/products/js/move-top.js");
    this.loadScript("assets/products/js/easing.js");
    this.loadScript("assets/products/js/imagezoom.js");
    this.loadScript("assets/products/js/jquery.flexisel.js");
    this.loadScript("assets/products/js/jquery.flexslider.js");
    this.loadScript("assets/products/js/bootstrap.js");
    this.loadScript("assets/products/js/carousel.js");
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
