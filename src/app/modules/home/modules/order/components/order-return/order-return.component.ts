import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../services/order.service';
import { OrderReturnTableModel } from '../../models/order-return-table.model'
import { AuthService } from 'src/app/core/services/auth.service';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';

@Component({
  selector: 'app-order-return',
  templateUrl: './order-return.component.html',
  styleUrls: ['./order-return.component.css']
})
export class OrderReturnComponent implements OnInit {

  private returnOrderSubscrip: ISubscription;

  returnForm: FormGroup;

  reason: string;
  orderDetailId: number;
  userId: number;
  formSubmitted: boolean;

  get form() {
    return this.returnForm.controls;
  }
  constructor(
    private route: ActivatedRoute,
    private service: OrderService,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.orderDetailId = this.route.snapshot.queryParams.detailId;
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.formSubmitted = false;
    this.returnForm = new FormGroup({
      reason: new FormControl('',
        Validators.compose([Validators.required]))

    })
  }

  returnOrder() {
 
    this.formSubmitted = true;
    let reson_temp = this.returnForm?.controls['reason'].value

    if (reson_temp) {
      reson_temp = reson_temp.trim()
    }
    else {
      return;
    }
    const returnModel = new OrderReturnTableModel();
    returnModel.reason = reson_temp
    // returnModel.reason = reason;
    returnModel.order_detail_id = this.orderDetailId;
    returnModel.created_by = this.userId.toString();


    if (returnModel.reason) {
      this.returnOrderSubscrip = this.service.returnOrder(returnModel).subscribe(res => {
        if (res) {
          this.formSubmitted = false;
          alert("order return");
          const path = `${RoutePathConfig.Home}/${RoutePathConfig.Order}`;
          this.router.navigate([path]);
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
    }
   else{
     alert("Enter valid reason")
   }
  }
  ngOnDestroy() {
    if (this.returnOrderSubscrip) {
      this.returnOrderSubscrip.unsubscribe();
    }
  }
}
