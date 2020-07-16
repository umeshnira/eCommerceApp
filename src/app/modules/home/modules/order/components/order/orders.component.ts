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

  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
    if (this.getCancelOrderSubscrip) {
      this.getCancelOrderSubscrip.unsubscribe();
    }
  }

  private getUserOrderDetails(id: number) {
    this.getOrderSubscrip = this.service.getUserOrders(id).subscribe((res: OrderDetailsModel) => {
      this.orderDetails = res;

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
  public getCancelledOrders() {
    this.getCancelOrderSubscrip = this.service.getCancelledOrders(this.userId).subscribe((res: OrderDetailsModel) => {
      this.cancelOrderDetails = res;

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
  private cancelOrder(id: number) {
    this.service.cancelOrder(id).subscribe((res: OrderDetailsModel) => {
      alert("order cancelled")
      this.getUserOrderDetails(this.userId);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
}
