import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { OrderDetailsModel } from 'src/app/modules/home/modules/order/models/order-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.css']
})
export class SalesInvoiceComponent implements OnInit {

  private getOrderSubscrip: ISubscription;

  public orderDetails = new OrderDetailsModel();

  constructor(
    private service: OrderService,
    private toastr: ToastrService,
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
  navigateTodetails() {
    this.router.navigate(['dashboard/sales/invoice-details']);
  }

  private orderViewList(no: number) {
    this.getOrderSubscrip = this.service.getSellerReturnOrders(no).subscribe((res) => {
      res.forEach(x => {
        const a = new Date(x.ordered_date);
        x.ordered_date = this.formatDate(x.ordered_date);

      });

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
