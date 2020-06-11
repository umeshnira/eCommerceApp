import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { SellerModel } from '../../models/sellerModel';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SellerSignUpComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  emailPattern = Constants.emailPattern;
  subscription: ISubscription;
  signUpForm: FormGroup;

  constructor(private service: RegistrationService) { }

  ngOnInit(): void {

    this.formInitialization();
  }

  submitForm() {

    this.formSubmitted = true;

    if (this.signUpForm.valid) {
      const sellerModel = new SellerModel();
      sellerModel.sellerName = this.signUpForm.controls['name'].value;
      sellerModel.address = this.signUpForm.controls['address'].value;
      sellerModel.landMark = this.signUpForm.controls['landmark'].value;
      sellerModel.pincode = this.signUpForm.controls['pincode'].value;
      sellerModel.email = this.signUpForm.controls['email'].value;
      sellerModel.phoneNo = this.signUpForm.controls['phone'].value;
      sellerModel.password = this.signUpForm.controls['password'].value;

      this.subscription = this.service.register(sellerModel).subscribe((response) => {

        if (response) {
          this.formSubmitted = false;
          this.signUpForm.reset();
        }
      },
        (error) => {
          console.log(error);
        });
    }
  }

  get form() {

    return this.signUpForm.controls;
  }

  ngOnDestroy() {

    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private formInitialization() {

    this.signUpForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      address: new FormControl(''),
      landmark: new FormControl(''),
      pincode: new FormControl(''),
      email: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(Constants.emailPattern)])),
      phone: new FormControl(''),
      password: new FormControl('',
        Validators.compose([Validators.required]))
    });
  }

}
