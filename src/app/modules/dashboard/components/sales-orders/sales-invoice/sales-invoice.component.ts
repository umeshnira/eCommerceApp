import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { OrderDetailsModel } from 'src/app/modules/home/modules/order/models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit, OnDestroy, AfterViewInit {

  private getOrderSubscrip: ISubscription;

  public orderDetails = new OrderDetailsModel();

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
  navigateTodetails(id: number) {

    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { orderId: id },
    };

    this.router.navigate(['dashboard/sales/invoice-details'], navigationExtras);
  }

  private orderViewList(no: number) {
    this.getOrderSubscrip = this.service.getAllOrdersByStatus(2, 0, (no - 1) * 10).subscribe((res) => {

      this.orderDetails = res;
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  ngOnDestroy() {
    if (this.getOrderSubscrip) {
      this.getOrderSubscrip.unsubscribe();
    }
  }

}
