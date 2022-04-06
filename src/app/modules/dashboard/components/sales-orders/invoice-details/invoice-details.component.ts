import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { InvoiceService } from 'src/app/modules/dashboard/components/sales-orders/services/invoice.service';
import { OrderService } from 'src/app/modules/home/modules/order/services/order.service';
import { InvoiceViewListModel } from '../models/invoice-view-list.model';
import { OrderLocationTableModel } from 'src/app/modules/home/modules/order/models/order-location-table.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit, OnDestroy {

  orderInvoice: InvoiceViewListModel;
  clientInvoice: InvoiceViewListModel;
  locationDetails: OrderLocationTableModel;

  getorderInvoice: ISubscription;
  getClientInvoice: ISubscription;

  private orderId: number;
  totalPrice: number;

  constructor(
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private invoiceService: InvoiceService,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {

    this.orderId = this.route.snapshot.queryParams.orderId;

    // this.getInvoiceDetails();
    this.getClientDetails();
  }

  ngOnDestroy() {
    if (this.getorderInvoice) {
      this.getorderInvoice.unsubscribe();
    }
    if (this.getClientInvoice) {
      this.getClientInvoice.unsubscribe();
    }
    if (this.getClientInvoice) {
      this.getClientInvoice.unsubscribe();
    }
  }



  // private getInvoiceDetails() {
  //   this.getorderInvoice = this.invoiceService.getInvoiceOrderDetails(this.orderId).subscribe((res) => {

  //     this.orderInvoice = res;
  //   },
  //     (error) => {
  //       this.toastr.error('', error.error.message);
  //     });
  // }
  private getClientDetails() {
    this.totalPrice = 0;
    this.getClientInvoice = this.invoiceService.getInvoiceOrderDetails(this.orderId).subscribe((respon) => {

      this.clientInvoice = respon;
      respon.forEach(x => {
        this.totalPrice = this.totalPrice + x.price;
      });
      if (this.clientInvoice.length > 0) {
        this.getorderInvoice = this.orderService.getLocationDetails(this.clientInvoice[0].user_id).subscribe((res) => {

          this.locationDetails = res;
        },
          (error) => {
            this.toastr.error('', error.error.message);
          });
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}
