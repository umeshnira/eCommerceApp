import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { CouponTableModel } from '../models/coupon-table.model';
import { CouponViewListModel } from '../models/coupon-view-list.model';
import { CouponService } from '../service/coupon.service';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { SubCategoryService } from 'src/app/shared/services/sub-category.service';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-edit-coupon',
  templateUrl: './add-edit-coupon.component.html',
  styleUrls: ['./add-edit-coupon.component.css']
})
export class AddEditCouponComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  userId: number;
  couponId: number;


  couponDetailsForm: FormGroup;

  couponDetails: CouponViewListModel;

  addSubscription: ISubscription;

  constructor(
    private route: ActivatedRoute,
    private service: CouponService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  get form() {
    return this.couponDetailsForm.controls;
  }
  ngOnInit(): void {
    this.couponId = this.route.snapshot.queryParams.couponId;

    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;

    this.productFormInitialization();

    if (this.couponId) {
      this.getCouponDetails(this.couponId);
    }
  }
  ngOnDestroy() {

    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
  }

  addCoupon() {
    const couponModel = this.addingValues();
    this.formSubmitted = true;

    this.addSubscription = this.service.createCoupon(couponModel).subscribe(response => {

      this.toastr.success('Product Added Successfully', 'Success');

      this.couponDetailsForm.reset();
      this.formSubmitted = false;

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

  UpdateCoupon() {
    const couponModel = this.addingValues();
    this.formSubmitted = true;

    this.addSubscription = this.service.UpdateCoupon(couponModel, this.couponId).subscribe(response => {

      this.toastr.success('Product Added Successfully', 'Success');

      this.couponDetailsForm.reset();
      this.formSubmitted = false;

    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
  private productFormInitialization() {
    this.couponDetailsForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      code: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      description: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      price: new FormControl('', [Validators.required]),
      end_date: new FormControl('', [Validators.required]),
      free_shipping: new FormControl(),
      on_store: new FormControl(),
      discount_type: new FormControl('', [Validators.required]),
      limit_per_coupon: new FormControl('', [Validators.required]),
      limit_per_item: new FormControl('', [Validators.required]),
      limit_per_user: new FormControl('', [Validators.required])
    });
  }

  private addingValues() {
    const couponModel = new CouponTableModel();

    couponModel.name = this.couponDetailsForm?.controls['name'].value;
    couponModel.description = this.couponDetailsForm?.controls['description'].value;
    couponModel.code = this.couponDetailsForm?.controls['code'].value;
    couponModel.price = this.couponDetailsForm?.controls['price'].value;
    couponModel.discount_type = this.couponDetailsForm?.controls['discount_type'].value;
    couponModel.free_shipping = this.couponDetailsForm?.controls['free_shipping'].value;
    couponModel.on_store = this.couponDetailsForm?.controls['on_store'].value;
    couponModel.status = Status.Active;
    couponModel.limit_per_coupon = this.couponDetailsForm?.controls['limit_per_coupon'].value;
    couponModel.limit_per_item = this.couponDetailsForm?.controls['limit_per_item'].value;
    couponModel.limit_per_user = this.couponDetailsForm?.controls['limit_per_user'].value;
    couponModel.end_date = this.couponDetailsForm?.controls['end_date'].value;
    couponModel.start_date = new Date;
    couponModel.created_by = this.userId.toString();
    couponModel.updated_by = this.userId.toString();

    return couponModel;

  }



  private getCouponDetails(couponId) {
    this.addSubscription = this.service.getCoupon(couponId).subscribe(response => {
      this.couponDetails = response;

      this.couponDetailsForm?.controls['name'].setValue(this.couponDetails?.name);
      this.couponDetailsForm?.controls['description'].setValue(this.couponDetails?.description);
      this.couponDetailsForm?.controls['code'].setValue(this.couponDetails?.code);
      this.couponDetailsForm?.controls['price'].setValue(this.couponDetails?.price);
      this.couponDetailsForm?.controls['discount_type'].setValue(this.couponDetails?.discount_type);
      this.couponDetailsForm?.controls['free_shipping'].setValue(this.couponDetails?.free_shipping);
      this.couponDetailsForm?.controls['on_store'].setValue(this.couponDetails?.on_store);
      this.couponDetailsForm?.controls['limit_per_coupon'].setValue(this.couponDetails?.limit_per_coupon);
      this.couponDetailsForm?.controls['limit_per_item'].setValue(this.couponDetails?.limit_per_item);
      this.couponDetailsForm?.controls['limit_per_user'].setValue(this.couponDetails?.limit_per_user);
      this.couponDetailsForm?.controls['end_date'].setValue(this.couponDetails?.end_date);
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }

}
