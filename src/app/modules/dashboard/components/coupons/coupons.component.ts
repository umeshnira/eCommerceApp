import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { CouponService } from 'src/app/modules/dashboard/components/coupons/service/coupon.service';
import { CouponViewListModel } from 'src/app/modules/dashboard/components/coupons/models/coupon-view-list.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css']
})
export class CouponsComponent implements OnInit, OnDestroy, AfterViewInit {

  private getCouponSubscrip: ISubscription;

  public couponDetails = new CouponViewListModel();



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
  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }
  ngAfterViewInit() {

    this.loadScript('assets/js/datatable.js');
  }

  navigateTodetails(id: number) {
debugger;
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { couponId: id },
    };

    this.router.navigate(['dashboard/coupons/edit-coupons'], navigationExtras);
  }
  private orderViewList() {
    this.getCouponSubscrip = this.service.getAllCoupon().subscribe((res) => {

      res.forEach(x => {
        const a = new Date(x.end_date);
        x.end_date = this.formatDate(x.end_date);
      });

      this.couponDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  private formatDate(date) {
    const d = new Date(date);
    let  month = '' + (d.getMonth() + 1);
    let  day = '' + d.getDate();
    const year = d.getFullYear();

   if (month.length < 2) {
     month = '0' + month;
   }
   if (day.length < 2) { day = '0' + day; }

   return [day, month, year].join('-');
 }

}
