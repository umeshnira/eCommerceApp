import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomFormValidator } from 'src/app/shared/validators/custom-form.validator';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { OfferService } from '../../services/offer.service';
import { ToastrService } from 'ngx-toastr';
import { OfferModel } from 'src/app/modules/home/modules/product/models/offer.model';
import { Status } from 'src/app/shared/enums/user-status.enum';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit, OnDestroy {

  userId: number;
  userRole: string;
  formSubmitted: boolean;
  offerModel: OfferModel;
  offerForm: FormGroup;
  createOfferSubscription: ISubscription;

  get form() {
    return this.offerForm.controls;
  }

  constructor(
    private offerService: OfferService,
    private toastr: ToastrService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.offerFormInitialization();
  }

  createOffer() {
    this.formSubmitted = true;

    if (this.offerForm.valid) {
      this.offerModel = this.prepareOfferRequestModel();
      this.createOfferSubscription = this.offerService.createOffer(this.offerModel).subscribe(response => {

        if (response) {
          this.toastr.success('Created Offer Successfully', 'Success');
        }
      },
        (error) => {
          this.toastr.error('', error.error.message);
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.createOfferSubscription) {
      this.createOfferSubscription.unsubscribe();
    }
  }

  private prepareOfferRequestModel() {
    const offerModel = new OfferModel();
    offerModel.name = this.offerForm.controls['name'].value;
    offerModel.description = this.offerForm.controls['description'].value;
    offerModel.percentage = this.offerForm.controls['percentage'].value;
    offerModel.status = Status.Active;
    offerModel.price = this.offerForm.controls['price'].value;
    offerModel.validFrom = this.offerForm.controls['validFrom'].value;
    offerModel.validTo = this.offerForm.controls['validTo'].value;
    offerModel.created_by = this.userRole;

    return offerModel;
  }

  private offerFormInitialization() {
    this.offerForm = new FormGroup({
      name: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      description: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      percentage: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      price: new FormControl('',
        Validators.compose([Validators.required, CustomFormValidator.cannotContainSpace])),
      validFrom: new FormControl('', Validators.required),
      validTo: new FormControl('', Validators.required),

    });
  }

}
