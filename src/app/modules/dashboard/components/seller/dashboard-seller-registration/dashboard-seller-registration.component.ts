import { Component, OnInit, OnDestroy } from '@angular/core';
import { SellerDetailsModel } from '../models/seller-details.model';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { Constants } from 'src/app/shared/models/constants';
import { SellerService } from 'src/app/shared/services/seller.service';
import { NavigationExtras, Router } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-dashboard-seller-registration',
  templateUrl: './dashboard-seller-registration.component.html',
  styleUrls: ['./dashboard-seller-registration.component.css']
})
export class DashboardSellerRegistrationComponent implements OnInit, OnDestroy {

  sellersList: SellerDetailsModel[];
  getAllSellersSubscription: ISubscription;
  sellerApproveSubscription: ISubscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private sellerService: SellerService,
    private toastr: ToastrService,
    private router: Router
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
          this.getAllSellers();
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
          this.getAllSellers();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  navigateToSellerDetails(sellerId: number) {
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
    if (this.sellerApproveSubscription) {
      this.sellerApproveSubscription.unsubscribe();
    }
    this.dtTrigger?.unsubscribe();
  }

  private getAllSellers() {
    this.getAllSellersSubscription = this.sellerService.getAllSellers()
      .subscribe(response => {

        if (response) {
          this.sellersList = response;
          this.sellersList = this.sellersList.filter(x => x.status === Status.Approval_Pending);
          this.dtTrigger.next();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });

  }
}
