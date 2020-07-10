import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SlideImage } from '../../models/slide-image.model';
import { ProductDetailsModel } from '../../models/product-details.model';
import { Image } from '../../models/product-image.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number;
  productDetails = new ProductDetailsModel();
  imageList: Image[] = [];
  imageObject: { name: string; path: string; }[];
  getProductSubscription: ISubscription;

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.queryParams.productId;
    this.getProductDetails(this.productId);
    // this.imageObject = [{
    //   name: 'test',
    //   path: 'http://localhost:1337/images/products/1594283804864-890312773-download (1).jfif'

    // }, {
    //   name: 'test',
    //   path: 'http://localhost:1337/images/products/1594283805241-355373324-download (1).jpg' // Support base64 image

    // }
    // ];
    // console.log(this.imageObject);
  }

  prepareImageList() {

    // if (this.productDetails.images && this.productDetails.images.length > 0) {
    //   this.productDetails.images.forEach(element => {
    //     this.imageList.push(element);
    //   });
    // }
    // console.log(this.imageList);
    this.imageObject = [{
      name: 'test',
      path: 'http://localhost:1337/images/products/1594283804864-890312773-download (1).jfif'

    }, {
      name: 'test',
      path: 'http://localhost:1337/images/products/1594283805241-355373324-download (1).jpg' // Support base64 image

    }
    ];
    console.log(this.imageObject);

  }

  ngOnDestroy() {

    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
  }

  private getProductDetails(productId: number) {

    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response: ProductDetailsModel) => {

      this.productDetails = response;
      this.prepareImageList();
      // this.imageObject = [{
      //   name: 'test',
      //   path: 'http://localhost:1337/images/products/1594283804864-890312773-download (1).jfif'

      // }, {
      //   name: 'test',
      //   path: 'http://localhost:1337/images/products/1594283805241-355373324-download (1).jpg' // Support base64 image

      // }
      // ];
      // console.log(this.imageObject);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });

  }

}
