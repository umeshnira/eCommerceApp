import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../order/services/order.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css'],
})

export class PaymentMethodComponent implements OnInit, OnDestroy {

  savedCards = true;
  atmCard: boolean;
  netBanking: boolean;
  upi: boolean;

  orderModel;

  addOrderSubcri: ISubscription;
  sendMailSubcri: ISubscription;

  constructor(
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) { }

  ngOnInit(): void {
    this.orderModel = this.orderService.orderStorage;

  }
  orderProducts() {
    this.addOrderSubcri = this.orderService.addOrder(this.orderModel).subscribe(response => {
      if (response) {
        alert('Product purchased !');
        this.orderService.orderStorage = [];
        this.sendMailSubcri = this.orderService.sendMail(response).subscribe(res => {
          if (res) {
            alert('Product purchased !');
            this.orderService.orderStorage = [];

          }
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

  radioChange(value: string) {

    if (value === 'atm') {
      this.atmCard = true;
      this.netBanking = false;
      this.savedCards = false;
      this.upi = false;
    } else if (value === 'netBanking') {
      this.netBanking = true;
      this.atmCard = false;
      this.savedCards = false;
      this.upi = false;
    } else if (value === 'upi') {
      this.upi = true;
      this.netBanking = false;
      this.atmCard = false;
      this.savedCards = false;
    } else {
      this.savedCards = true;
      this.netBanking = false;
      this.atmCard = false;
      this.upi = false;
    }
  }

  ngOnDestroy() {
    if (this.addOrderSubcri) {
      this.addOrderSubcri.unsubscribe();
    }
    if (this.sendMailSubcri) {
      this.sendMailSubcri.unsubscribe();
    }
  }
}
