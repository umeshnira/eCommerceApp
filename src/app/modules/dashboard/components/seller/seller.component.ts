import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellerService } from './services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SellerDetailsModel } from './models/seller-details.model';

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
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllSellers();
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
