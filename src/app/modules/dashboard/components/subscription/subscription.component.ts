import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { SubcriptionService } from './service/subcription.service';
import { SubscriptionViewListModel } from './models/subscription-view-List.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit, OnDestroy {

  private getSubscrip: ISubscription;

  public subDetails = new SubscriptionViewListModel();

  constructor(
    private service: SubcriptionService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subViewList();
  }

  ngOnDestroy() {
    if (this.getSubscrip) {
      this.getSubscrip.unsubscribe();
    }
  }
  navigateTodetails(id: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { couponId: id },
    };

    this.router.navigate(['dashboard/coupons/edit-coupons'], navigationExtras);
  }

  private subViewList() {
    this.getSubscrip = this.service.getAllSubcription().subscribe((res) => {

      this.subDetails = res;
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
