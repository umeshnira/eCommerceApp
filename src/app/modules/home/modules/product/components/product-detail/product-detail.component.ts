import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SlideImage } from '../../models/slide-image.model';
import { element } from 'protractor';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: any;
  productDetails: any;
  imageList: any[] = [];
  slideImageArray = new Array<SlideImage>();
 

  getProductSubscription: ISubscription;

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.queryParams.id;
    this.getProductDetails(this.productId);
    const imageObject = [{
      image: '../../../assets/products/images/se3.jpg',
      thumbImage: '../../../assets/products/images/se3.jpg',

    }, {
      image: '../../../assets/products/images/se3.jpg', // Support base64 image
      thumbImage: '../../../assets/products/images/se3.jpg', // Support base64 image

    }
    ];
    console.log(imageObject);
  }

  ngOnDestroy() {

    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
  }

  private prepareSlideImage() {
debugger;
    
    this.imageList.forEach(element => {
      const slideImage = new SlideImage();
      slideImage.image = element.path;
      slideImage.thumbImage = element.path;
      this.slideImageArray.push(slideImage);
    });
console.log('slide', this.slideImageArray);
  }

  private getProductDetails(productId) {

    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response) => {

      this.productDetails = response;
      if (this.productDetails.images) {
        this.productDetails.images.forEach(element => {
          this.imageList.push(element);
        });
      }
      this.prepareSlideImage();
    },
      (error) => {
        if (error instanceof HttpErrorResponse) {
          this.toastr.error('', error.error.message);
          console.log(error);
        } else {
          this.toastr.error('', error);
        }
      });

  }

}
