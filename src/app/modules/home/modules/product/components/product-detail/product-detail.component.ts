import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  productId: any;
  productDetails: any;
  imageList: any[] = [];

  getProductSubscription: ISubscription;

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.productId = this.route.snapshot.queryParams.id;
    this.getProductDetails(this.productId);
  }

  ngOnDestroy() {

    if (this.getProductSubscription) {
      this.getProductSubscription.unsubscribe();
    }
  }

  private getProductDetails(productId) {

    this.getProductSubscription = this.service.getProductDetails(productId).subscribe((response) => {

      this.productDetails = response;
      if (this.productDetails.images) {
        this.productDetails.images.forEach(element => {
          this.imageList.push(element);
        });
      }
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
