import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsModel } from '../../models/product-details.model';

declare var $: any;
declare var init_ExZoom_Container: any;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})

export class ProductDetailComponent implements OnInit, OnDestroy {

  productId: number;
  productDetails = new ProductDetailsModel();
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
      init_ExZoom_Container();
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}
