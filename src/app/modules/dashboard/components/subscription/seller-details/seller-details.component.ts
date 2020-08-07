import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SellerService } from 'src/app/shared/services/seller.service';
import { ToastrService } from 'ngx-toastr';
import { SellerDetailsModel } from '../models/seller-details.model';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { Constants } from 'src/app/shared/models/constants';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.css']
})
export class SellerDetailsComponent implements OnInit, OnDestroy {
  sellerId: number;
  isSeller: boolean;
  sellerDetails: SellerDetailsModel;
  sellerDetailsForm: FormGroup;
  sellerDetailsSubscription: ISubscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sellerService: SellerService,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    const userRole = userDetails.role;
    if (userRole === Constants.seller) {
      this.sellerId = userDetails.user_id;
      this.isSeller = true;
    } else {
      this.isSeller = false;
      this.sellerId = this.route.snapshot.queryParams.sellerId;
    }
    this.sellerFormInitialization();
    this.getSellerDetails();
  }

  ngOnDestroy() {
    if (this.sellerDetailsSubscription) {
      this.sellerDetailsSubscription.unsubscribe();
    }
  }

  private getSellerDetails() {
    this.sellerDetailsSubscription = this.sellerService.getSellerDetailsById(this.sellerId)
      .subscribe(response => {

        if (response) {
          this.sellerDetails = response;
          this.setValuesOnSellerForm();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
  }

  private setValuesOnSellerForm() {
    this.sellerDetailsForm?.controls['name'].setValue(this.sellerDetails?.name);
    this.sellerDetailsForm?.controls['address'].setValue(this.sellerDetails?.address);
    this.sellerDetailsForm?.controls['landmark'].setValue(this.sellerDetails?.landmark);
    this.sellerDetailsForm?.controls['pincode'].setValue(this.sellerDetails?.pincode);
    this.sellerDetailsForm?.controls['email'].setValue(this.sellerDetails?.email);
    this.sellerDetailsForm?.controls['phone'].setValue(this.sellerDetails?.phone);
    this.sellerDetailsForm?.controls['aadhar_card_no'].setValue(this.sellerDetails?.aadhar_card_no);
    this.sellerDetailsForm?.controls['pan_card_no'].setValue(this.sellerDetails?.pan_card_no);
    this.sellerDetailsForm?.controls['bank_name'].setValue(this.sellerDetails?.bank_name);
    this.sellerDetailsForm?.controls['bank_ac_no'].setValue(this.sellerDetails?.bank_ac_no);
    this.sellerDetailsForm?.controls['branch_name'].setValue(this.sellerDetails?.branch_name);
    this.sellerDetailsForm?.controls['ifsc_code'].setValue(this.sellerDetails?.ifsc_code);
  }

  private sellerFormInitialization() {
    this.sellerDetailsForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        address: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        landmark: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        pincode: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        email: new FormControl('', Validators.compose([Validators.required,
        Validators.pattern(Constants.emailPattern)])),
        phone: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        aadhar_card_no: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        pan_card_no: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        bank_name: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        bank_ac_no: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        branch_name: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
        ifsc_code: new FormControl('', Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
    });
  }

}
