import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDetailsModel } from '../../models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  private getOrderSubscrip: ISubscription;
  private getCancelOrderSubscrip: ISubscription;
  private cancelOrderSubscrip: ISubscription;

  public orderDetails = new OrderDetailsModel();
  public cancelOrderDetails = new OrderDetailsModel();

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  private userId: number;

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.getUserOrderDetails(this.userId);
  }

  cancelOrder(id: number) {
    this.cancelOrderSubscrip = this.service.cancelOrder(id).subscribe(res => {
      if (res) {
        alert("order cancelled");
        this.getUserOrderDetails(this.userId);
      }

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
    if (this.getCancelOrderSubscrip) {
      this.getCancelOrderSubscrip.unsubscribe();
    }
    if (this.cancelOrderSubscrip) {
      this.cancelOrderSubscrip.unsubscribe();
    }
  }

  private getUserOrderDetails(id: number) {
    this.getOrderSubscrip = this.service.getUserOrders(id).subscribe((res) => {
    
      res.forEach(x => {
        x.ordered_date = this.formatDate(x.ordered_date);
      });
      this.orderDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
  public getCancelledOrders() {
    this.getCancelOrderSubscrip = this.service.getCancelledOrders(this.userId).subscribe((res) => {
      res.forEach(x => {
        x.ordered_date = this.formatDate(x.ordered_date);
      });
      this.cancelOrderDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
  private formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [day, month, year].join('-');
  }
}
