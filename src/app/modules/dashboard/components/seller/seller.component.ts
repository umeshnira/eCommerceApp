import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SellerDetailsModel } from './models/seller-details.model';
import { SellerService } from 'src/app/shared/services/seller.service';
import { NavigationExtras, ActivatedRoute, Router } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit, OnDestroy {

  sellersList: SellerDetailsModel;
  getAllSellersSubscription: ISubscription;

  constructor(
    private sellerService: SellerService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllSellers();
  }

  navigateToDetailPage(sellerId: number) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { sellerId: sellerId },
    };

    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Subscriptions}/${RoutePathConfig.SellerDetails}`;
    this.router.navigate([path], navigationExtras);
  }

  ngOnDestroy() {
    if (this.getAllSellersSubscription) {
      this.getAllSellersSubscription.unsubscribe();
    }
  }

  private getAllSellers() {
    this.getAllSellersSubscription = this.sellerService.getAllSellers()
    .subscribe(response => {

      if (response) {
      this.sellersList = response;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });

  }

  
}
