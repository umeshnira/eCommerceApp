import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';

@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-sign-up.component.html',
  styleUrls: ['./client-sign-up.component.css']
})

export class ClientSignUpComponent implements OnInit, OnDestroy {

  username: any;
  password: any;
  formSubmitted = false;
  validationPattern = Constants.validationPattern;
  subscription: ISubscription;
  signUpForm: FormGroup;

  constructor(private service: RegistrationService) { }

  ngOnInit(): void {

    this.formInitialization();
  }

  formInitialization() {

    this.signUpForm = new FormGroup({
      username: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(this.validationPattern)])),
      password: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
    });
  }

  submitForm(signUpForm: FormGroup) {

    this.formSubmitted = true;

    if (signUpForm.valid) {
      const model = {
        userName: signUpForm.value.username,
        password: signUpForm.value.password,
        role: Constants.client
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
