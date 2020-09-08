import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/modules/home/modules/product/services/product.service';
import { ReviewViewDetailsModel } from 'src/app/modules/home/modules/product/models/review-view-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy, AfterViewInit {

  private getReviewSubscrip: ISubscription;

  public reviewDetails = new ReviewViewDetailsModel();

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
  ngOnDestroy() {
    if (this.getReviewSubscrip) {
      this.getReviewSubscrip.unsubscribe();
    }
  }

  private getUserOrderDetails(id: number) {
    this.getReviewSubscrip = this.service.getSellerReviews(id).subscribe((res) => {

      res.forEach(x => {
        const a = new Date(x.date);
        x.date = this.formatDate(x.date);
      });

      this.reviewDetails = res;
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
