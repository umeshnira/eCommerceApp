import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { OrderDetailsModel } from 'src/app/modules/home/modules/order/models/order-details.model';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit, OnDestroy {

  private getOrderSubscrip: ISubscription;

  public orderDetails = new Array<OrderDetailsModel>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  public pageNo;

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.orderViewList(1);
  }

  navigateTodetails(id: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { orderId: id },
    };

    this.router.navigate(['dashboard/sales/invoice-details'], navigationExtras);
  }

  private orderViewList(no: number) {
    this.getOrderSubscrip = this.service.getAllOrdersByStatus(2, 0, (no - 1) * 10).subscribe((res) => {
      if(res){
        this.orderDetails = res;
        this.dtTrigger.next();
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
    this.dtTrigger?.unsubscribe();
  }

}
