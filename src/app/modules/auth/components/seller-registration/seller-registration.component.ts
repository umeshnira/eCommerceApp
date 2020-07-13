import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SellerModel } from '../../models/seller-model';
import { ToastrService } from 'ngx-toastr';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { UserRole } from 'src/app/shared/enums/user-role.enum';

@Component({
  selector: 'app-sign-up',
  templateUrl: './seller-registration.component.html',
  styleUrls: ['./seller-registration.component.css']
})

export class SellerRegistrationComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  sellerRegisterSubscription: ISubscription;
  sellerSignUpForm: FormGroup;

  get form() {
    return this.sellerSignUpForm.controls;
  }

  constructor(
    private service: RegistrationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.sellerSignUpFormInitialization();
  }

  submitSellerSignUpForm() {
    this.formSubmitted = true;

    if (this.sellerSignUpForm.valid) {
      const sellerModel = this.prepareSellerModel();

      this.sellerRegisterSubscription = this.service.registerSeller(sellerModel).subscribe((response) => {

        if (response) {
          this.formSubmitted = false;
          this.sellerSignUpForm.reset();
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        });
    }
  }

  ngOnDestroy() {
    if (this.sellerRegisterSubscription) {
      this.sellerRegisterSubscription.unsubscribe();
    }
  }

  private prepareSellerModel() {
    const sellerModel = new SellerModel();
    sellerModel.name = this.sellerSignUpForm.controls['name'].value;
    sellerModel.address = this.sellerSignUpForm.controls['address'].value;
    sellerModel.landmark = this.sellerSignUpForm.controls['landmark'].value;
    sellerModel.pin_code = this.sellerSignUpForm.controls['pincode'].value;
    sellerModel.email = this.sellerSignUpForm.controls['email'].value;
    sellerModel.phone = this.sellerSignUpForm.controls['phone'].value;
    sellerModel.aadhar_card_no = this.sellerSignUpForm.controls['aadhar_card_no'].value;
    sellerModel.pan_card_no = this.sellerSignUpForm.controls['pan_card_no'].value;
    sellerModel.bank_name = this.sellerSignUpForm.controls['bank_name'].value;
    sellerModel.bank_ac_no = this.sellerSignUpForm.controls['bank_ac_no'].value;
    sellerModel.branch_name = this.sellerSignUpForm.controls['branch_name'].value;
    sellerModel.ifsc_code = this.sellerSignUpForm.controls['ifsc_code'].value;
    sellerModel.user_name = this.sellerSignUpForm.controls['user_name'].value;
    sellerModel.password = this.sellerSignUpForm.controls['password'].value;
    sellerModel.created_by = Constants.admin;
    sellerModel.status = Status.Active;
    sellerModel.role = UserRole.Seller;

    return sellerModel;
  }

  private sellerSignUpFormInitialization() {
    this.sellerSignUpForm = new FormGroup({
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
      user_name: new FormControl('', Validators.compose([Validators.required,
      CustomFormValidator.cannotContainSpace])),
      password: new FormControl('', Validators.compose([Validators.required,
      CustomFormValidator.cannotContainSpace]))
    });
  }

}
