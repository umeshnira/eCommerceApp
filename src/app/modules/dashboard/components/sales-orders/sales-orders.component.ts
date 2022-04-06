import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { OrderDetailsModel } from 'src/app/modules/home/modules/order/models/order-details.model';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sales-orders',
  templateUrl: './sales-orders.component.html',
  styleUrls: ['./sales-orders.component.css']
})
export class SalesOrdersComponent implements OnInit, OnDestroy {

  private getOrderSubscrip: ISubscription;

  public orderDetails = new Array<OrderDetailsModel>();

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

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
  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
    this.dtTrigger?.unsubscribe();
  }

  private getUserOrderDetails(id: number) {
    this.getOrderSubscrip = this.service.getSellerOrders(id).subscribe((res) => {
     if(res){
      this.orderDetails = res;
      this.dtTrigger.next();
     }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }



}
