import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { ReviewViewDetailsModel } from 'src/app/modules/home/modules/product/models/review-view-details.model';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  private getReviewSubscrip: ISubscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  public reviewDetails = new Array<ReviewViewDetailsModel>();

  private userId: number;

  constructor(
    private service: ProductService,
    private toastr: ToastrService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getUserOrderDetails(this.userId);
  }

  ngOnDestroy() {
    if (this.getReviewSubscrip) {
      this.getReviewSubscrip.unsubscribe();
    }
    this.dtTrigger?.unsubscribe();
  }

  private getUserOrderDetails(id: number) {
    this.getReviewSubscrip = this.service.getSellerReviews(id).subscribe((res) => {

      this.reviewDetails = res;
      this.dtTrigger.next();
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
