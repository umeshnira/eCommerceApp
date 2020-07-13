import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { Constants } from 'src/app/shared/models/constants';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { ClientModel } from '../../models/client.model';
import { ToastrService } from 'ngx-toastr';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { UserRole } from 'src/app/shared/enums/user-role.enum';
import { Status } from 'src/app/shared/enums/user-status.enum';

@Component({
  selector: 'app-client-sign-up',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.css']
})

export class ClientRegistrationComponent implements OnInit, OnDestroy {

  formSubmitted: boolean;
  clientSignUpForm: FormGroup;
  clientRegisterSubscription: ISubscription;

  get form() {
    return this.clientSignUpForm.controls;
  }

  constructor(
    private service: RegistrationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.clientFormInitialization();
  }

  submitClientRegisterForm() {
    this.formSubmitted = true;

    if (this.clientSignUpForm.valid) {
      const clientModel = new ClientModel();
      clientModel.name = this.clientSignUpForm.controls['name'].value;
      clientModel.address = this.clientSignUpForm.controls['address'].value;
      clientModel.landmark = this.clientSignUpForm.controls['landmark'].value;
      clientModel.pin_code = this.clientSignUpForm.controls['pin_code'].value;
      clientModel.email = this.clientSignUpForm.controls['email'].value;
      clientModel.phone = this.clientSignUpForm.controls['phone'].value;
      clientModel.user_name = this.clientSignUpForm.controls['username'].value;
      clientModel.password = this.clientSignUpForm.controls['password'].value;
      clientModel.created_by = Constants.admin;
      clientModel.role = UserRole.Client;
      clientModel.status = Status.Active;

      this.clientRegisterSubscription = this.service.registerClient(clientModel).subscribe((response) => {

        if (response) {
          this.formSubmitted = false;
          this.clientSignUpForm.reset();
        }
      },
        (error) => {
          this.toastr.error('', error.console.error.message);
        });
    }
  }

  ngOnDestroy() {
    if (this.clientRegisterSubscription) {
      this.clientRegisterSubscription.unsubscribe();
    }
  }

  private clientFormInitialization() {
    this.clientSignUpForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      address: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      landmark: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      pin_code: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      email: new FormControl('',
        Validators.compose([Validators.required,
          Validators.pattern(Constants.emailPattern)])),
      phone: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
      username: new FormControl('',
        Validators.compose([Validators.required,
        Validators.pattern(Constants.validationPattern)])),
      password: new FormControl('',
        Validators.compose([Validators.required,
        CustomFormValidator.cannotContainSpace])),
    });
  }
}
