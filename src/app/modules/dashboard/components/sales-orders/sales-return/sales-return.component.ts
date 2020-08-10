import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { OrderDetailsModel } from 'src/app/modules/home/modules/order/models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sales-return',
  templateUrl: './sales-return.component.html',
  styleUrls: ['./sales-return.component.css']
})
export class SalesReturnComponent implements OnInit, OnDestroy {

  private getOrderSubscrip: ISubscription;

  public orderDetails = new OrderDetailsModel();

  private userId: number;

  constructor(
    private service: OrderService,
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
    })
  }
  ngAfterViewInit() {

    this.loadScript('assets/js/datatable.js');
  }
  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
  }

  private getUserOrderDetails(id: number) {
    this.getOrderSubscrip = this.service.getSellerReturnOrders(id).subscribe((res) => {
      res.forEach(x => {
        let a = new Date(x.ordered_date);
        x.ordered_date = this.formatDate(x.ordered_date);

      });

      this.orderDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }



  private formatDate(date) {
    let d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }
}
