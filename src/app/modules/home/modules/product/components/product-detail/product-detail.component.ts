import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { SlideImage } from '../../models/slide-image.model';
import { ProductDetailsModel } from '../../models/product-details.model';
import { Image } from '../../models/product-image.model';

declare var $: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number;
  productDetails = new ProductDetailsModel();
  images: Image[] = [];
  getProductSubscription: ISubscription;

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.route.snapshot.queryParams.productId;
    this.getProductDetails(this.productId);
  }

  ngOnDestroy() {
    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
  }

  private getProductDetails(productId: number) {
    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response: ProductDetailsModel) => {
      this.productDetails = response;
      this.prepareImageList(response.images);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  prepareImageList(images: Image[]) {
    images.forEach(image => this.images.push(image));
    $('.exzoom-container').imagesLoaded(function () {
      $('#exzoom').exzoom({
        autoPlay: false,
      });
      $('#exzoom').removeClass('hidden');
    });
  }
}
