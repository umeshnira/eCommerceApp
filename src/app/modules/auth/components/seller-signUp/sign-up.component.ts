import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';

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

  formInitialization() {

    this.signUpForm = new FormGroup({
      name: new FormControl('', Validators.compose([Validators.required])),
      address: new FormControl(''),
      landmark: new FormControl(''),
      pincode: new FormControl(''),
      email: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(this.emailPattern)])),
      phone: new FormControl(''),
      password: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace]))
    });
  }

  submitForm(signUpForm: FormGroup) {

    this.formSubmitted = true;

    if (signUpForm.valid) {
      const model = {
        sellerName: signUpForm.value.name,
        address: signUpForm.value.address,
        landmark: signUpForm.value.landmark,
        pincode: signUpForm.value.pincode,
        email: signUpForm.value.email,
        phone: signUpForm.value.phone,
        password: signUpForm.value.password,
        role: Constants.seller
      };

      this.subscription = this.service.register(model).subscribe((response) => {

        if (response) {
          signUpForm.reset();
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

}
