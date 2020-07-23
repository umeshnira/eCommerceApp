import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { OrderService } from '../../services/order.service';
import { OrderDetailsModel } from '../../models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrderComponent implements OnInit, OnDestroy {

  private getOrderSubscrip: ISubscription;
  private getCancelOrderSubscrip: ISubscription;
  private cancelOrderSubscrip: ISubscription;
  private buyAgainOrderSubscrip: ISubscription;
  private OpenOrderSubscrip: ISubscription;

  public orderDetails = new OrderDetailsModel();
  public cancelOrderDetails = new OrderDetailsModel();
  public buyAgainDetails = new OrderDetailsModel();
  public openOrderDetails = new OrderDetailsModel();

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
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

  getCancelledOrders() {
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

  returnOrder(detailId: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { detailId: detailId },
      relativeTo: this.route
    };

    this.router.navigate([RoutePathConfig.OrderReturn], navigationExtras);
  }

  getBuyAgain() {
    this.buyAgainOrderSubscrip = this.service.getBuyAgainProducts(this.userId).subscribe((res) => {
      this.buyAgainDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  getOpenOrder() {
    this.OpenOrderSubscrip = this.service.getOpenOrders(this.userId).subscribe((res) => {
      res.forEach(x => {
        let a=new Date(x.ordered_date);
        x.ordered_date = this.formatDate(x.ordered_date);        
        let b=new Date;

        x.dateGap = this.dateDiffInDays( a, b); 
      });
      this.openOrderDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  redirectToDetails(product_id) {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { productId: product_id },
    };
    const path = `${RoutePathConfig.Home}/${RoutePathConfig.ProductsDetail}`;
    this.router.navigate([path], navigationExtras);
  }

  getOrders() {
    this.getUserOrderDetails(this.userId);
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
        let a=new Date(x.ordered_date);
        x.ordered_date = this.formatDate(x.ordered_date);        
        let b=new Date;

        x.dateGap = this.dateDiffInDays( a, b);          
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

  private dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
