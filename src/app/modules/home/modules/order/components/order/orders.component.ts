import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderDetailsModel } from '../../models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  getOrderSubscrip: ISubscription;
  userId: number;
  orderDetails = new OrderDetailsModel();

  constructor(
    private service: OrderService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.userId = 19;
    this.getUserOrderDetails(this.userId);
  }

  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
  }

  getUserOrderDetails(id: number) {
    this.getOrderSubscrip = this.service.getUserOrders(id).subscribe((res: OrderDetailsModel) => {
      this.orderDetails = res;

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
}
