import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellerDetailsModel } from '../models/seller-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SellerService } from '../services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { Constants } from 'src/app/shared/models/constants';

@Component({
  selector: 'app-dashboard-seller-registration',
  templateUrl: './dashboard-seller-registration.component.html',
  styleUrls: ['./dashboard-seller-registration.component.css']
})
export class DashboardSellerRegistrationComponent implements OnInit, OnDestroy {

  sellersList: SellerDetailsModel[];
  getAllSellersSubscription: ISubscription;
  sellerApproveSubscription: ISubscription;

  constructor(
    private sellerService: SellerService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllSellers();
  }

  approveSellerRegistration(sellerId: number, seller: SellerDetailsModel) {
    seller.status = Status.Active;
    seller.updated_by = Constants.admin;
    this.sellerApproveSubscription = this.sellerService.updateSellerRegistrationStatus(sellerId, seller)
      .subscribe(response => {

        if (response) {
          this.toastr.success('Approved Seller', 'Success');
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  denySellerRegistration(sellerId: number, seller: SellerDetailsModel) {
    seller.status = Status.InActive;
    seller.updated_by = Constants.admin;
    this.sellerApproveSubscription = this.sellerService.updateSellerRegistrationStatus(sellerId, seller)
      .subscribe(response => {

        if (response) {
          this.toastr.success('Approved Seller', 'Success');
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  ngOnDestroy() {
    if (this.getAllSellersSubscription) {
      this.getAllSellersSubscription.unsubscribe();
    }
    if (this.sellerApproveSubscription) {
      this.sellerApproveSubscription.unsubscribe();
    }
  }

  private getAllSellers() {
    this.getAllSellersSubscription = this.sellerService.getAllSellers()
      .subscribe(response => {

        if (response) {
          this.sellersList = response;
          this.sellersList = this.sellersList.filter(x => x.status === Status.Approval_Pending);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });

  }
}
