import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ClientModel } from '../../models/client.model';

@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})

export class ClientRegistrationComponent implements OnInit, OnDestroy {

  username: any;
  password: any;
  formSubmitted = false;
  subscription: ISubscription;
  signUpForm: FormGroup;

  constructor(private service: RegistrationService) { }

  ngOnInit(): void {

    this.formInitialization();
  }

  submitForm() {

    this.formSubmitted = true;

    if (this.signUpForm.valid) {

      const clientModel = new ClientModel();
      clientModel.userName = this.signUpForm.controls['username'].value;
      clientModel.password = this.signUpForm.controls['password'].value;

      this.subscription = this.service.register(clientModel).subscribe((response) => {

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
      username: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(Constants.validationPattern)])),
      password: new FormControl('',
        Validators.compose([Validators.required])),
    });
  }

}
