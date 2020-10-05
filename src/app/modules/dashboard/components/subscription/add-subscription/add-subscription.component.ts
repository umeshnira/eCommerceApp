import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionPlanTableModel } from '../models/subscription-plan-table.model';
import { SubscriptionViewListModel } from '../models/subscription-view-List.model';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SubcriptionService } from '../service/subcription.service';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  userId: number;
  subscriptionId: number;

  subFrom: FormGroup;

  subcriptionDetails: SubscriptionViewListModel;

  addSubscription: ISubscription;
  getSubscription: ISubscription;

  get form() {
    return this.subFrom.controls;
  }
  constructor(
    private route: ActivatedRoute,
    private service: SubcriptionService,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {

    this.subscriptionId = this.route.snapshot.queryParams.subscriptionId;
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;

    this.SubscriptionFormInitialization();
    if (this.subscriptionId) {
      this.getSubDetails(this.subscriptionId);
    }

  }
  ngOnDestroy() {

    if (this.addSubscription) {
      this.addSubscription.unsubscribe();
    }
    if (this.getSubscription) {
      this.addSubscription.unsubscribe();
    }
  }
  addSubscript() {
    this.formSubmitted = true;

    if (this.subFrom.valid) {
      const couponModel = this.addingValues();
      this.addSubscription = this.service.createSubcription(couponModel).subscribe(response => {

        this.toastr.success('Product Added Successfully', 'Success');

        this.subFrom.reset();
        this.formSubmitted = false;

      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
    } else {
      this.toastr.warning('Please check all fields', 'Warning');
    }
  }

  updateSubscript() {
    this.formSubmitted = true;

    if (this.subFrom.valid) {
      const couponModel = this.addingValues();
      this.addSubscription = this.service.updateSubcription(couponModel, this.subscriptionId).subscribe(response => {

        this.toastr.success('Product Updated Successfully', 'Success');

        this.subFrom.reset();
        this.formSubmitted = false;

      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
    } else {
      this.toastr.warning('Please check all fields', 'Warning');
    }
  }

  private SubscriptionFormInitialization() {
    this.subFrom = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      amount: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      description: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      type: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }

  private addingValues() {
    const subscriptionModel = new SubscriptionPlanTableModel();
    subscriptionModel.name = this.subFrom?.controls['name'].value;
    subscriptionModel.amount = this.subFrom?.controls['amount'].value;
    subscriptionModel.type = this.subFrom?.controls['type'].value;
    subscriptionModel.description = this.subFrom?.controls['description'].value;
    subscriptionModel.status = Status.Active;
    subscriptionModel.created_by = this.userId.toString();
    subscriptionModel.updated_by = this.userId.toString();

    return subscriptionModel;

  }

  private getSubDetails(subId) {
    this.getSubscription = this.service.getSubcription(subId).subscribe(response => {
      this.subcriptionDetails = response;

      this.subFrom.setValue({
        name: this.subcriptionDetails?.name,
        amount: this.subcriptionDetails?.amount,
        type: this.subcriptionDetails?.type,
        description: this.subcriptionDetails?.description
      });
    },
      (error) => {
        this.toastr.error('', error.error.message);
      });
  }
}
