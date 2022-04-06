import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CouponService } from 'src/app/modules/dashboard/components/coupons/service/coupon.service';
import { CouponViewListModel } from 'src/app/modules/dashboard/components/coupons/models/coupon-view-list.model';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy {

  private getCouponSubscrip: ISubscription;

  public couponDetails = new Array<CouponViewListModel>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(
    private service: CouponService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.orderViewList();
  }

  ngOnDestroy() {
    if (this.getCouponSubscrip) {
      this.getCouponSubscrip.unsubscribe();
    }
  }

  navigateTodetails(id: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { couponId: id },
    };

    this.router.navigate(['dashboard/coupons/edit-coupons'], navigationExtras);
  }
  private orderViewList() {
    this.getCouponSubscrip = this.service.getAllCoupon().subscribe((res) => {
      if(res?.length>0){
        this.couponDetails = res;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }


}
