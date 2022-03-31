import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { CustomFormValidator } from "src/app/shared/validators/custom-form.validator";
import { SubscriptionLike as ISubscription } from "rxjs";
import { OfferService } from "../../services/offer.service";
import { ToastrService } from "ngx-toastr";
import { OfferModel } from "src/app/modules/home/modules/product/models/offer.model";
import { Status } from "src/app/shared/enums/user-status.enum";
import { AuthService } from "src/app/core/services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RoutePathConfig } from "src/app/core/config/route-path-config";

@Component({
  selector: "app-add-offer",
  templateUrl: "./add-offer.component.html",
  styleUrls: ["./add-offer.component.css"],
})
export class AddOfferComponent implements OnInit, OnDestroy {
  userId: number;
  offerId: number;
  userRole: string;
  formSubmitted: boolean;
  isEdit: boolean = false;
  offerModel: OfferModel;
  offerEditDetails: OfferModel;
  offerForm: FormGroup;
  createOfferSubscription: ISubscription;
  getOfferDetailsSubcription: ISubscription;
  minFromDate = new Date();
  minToDate = new Date();

  get form() {
    return this.offerForm.controls;
  }

  constructor(
    private offerService: OfferService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const userDetails = this.authService.getUserDetailsFromCookie();
    this.userId = userDetails.user_id;
    this.userRole = userDetails.role;
    this.offerFormInitialization();
    this.offerId = this.route.snapshot.params?.id;
    if (this.offerId) {
      this.isEdit = true;
      this.offerDetails(this.offerId);
    }
  }

  createOffer() {
    this.formSubmitted = true;

    if (this.offerForm.valid) {
      this.offerModel = this.prepareOfferRequestModel();
      if (!this.isEdit) {
        this.createOfferSubscription = this.offerService
          .createOffer(this.offerModel)
          .subscribe(
            (response) => {
              if (response) {
                this.toastr.success("Created Offer Successfully", "Success");
                this.goBack();
              }
            },
            (error) => {
              this.toastr.error("", error.error.message);
            }
          );
      } else {
        this.createOfferSubscription = this.offerService
          .updateOffer(this.offerModel, this.offerId)
          .subscribe(
            (response) => {
              if (response) {
                this.toastr.success("Offer Updated Successfully", "Success");
                this.goBack();
              }
            },
            (error) => {
              this.toastr.error("", error.error.message);
            }
          );
      }
    }
  }

  ngOnDestroy() {
    if (this.createOfferSubscription) {
      this.createOfferSubscription.unsubscribe();
    }
    this.getOfferDetailsSubcription?.unsubscribe();
  }

  private prepareOfferRequestModel() {
    const offerModel = new OfferModel();
    offerModel.name = this.offerForm.controls["name"].value;
    offerModel.description = this.offerForm.controls["description"].value;
    offerModel.percentage = this.offerForm.controls["percentage"].value;
    offerModel.status = Status.Active;
    offerModel.price = this.offerForm.controls["price"].value;
    offerModel.validFrom = this.offerForm.controls["validFrom"].value;
    offerModel.validTo = this.offerForm.controls["validTo"].value;
    if (!this.isEdit) {
      offerModel.created_by = this.userRole;
    } else {
      offerModel.updated_by = this.userRole;
      offerModel.created_by = this.offerEditDetails?.created_by;
    }

    return offerModel;
  }

  private offerFormInitialization() {
    this.offerForm = new FormGroup({
      name: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          CustomFormValidator.cannotContainSpace,
        ])
      ),
      description: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          CustomFormValidator.cannotContainSpace,
        ])
      ),
      percentage: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          CustomFormValidator.cannotContainSpace,
        ])
      ),
      price: new FormControl(
        "",
        Validators.compose([
          Validators.required,
          CustomFormValidator.cannotContainSpace,
        ])
      ),
      validFrom: new FormControl("", Validators.required),
      validTo: new FormControl("", Validators.required),
    });
  }

  setFormValues() {
    this.offerForm.patchValue({
      name: this.offerEditDetails?.name,
      description: this.offerEditDetails?.description,
      percentage: this.offerEditDetails?.percentage,
      price: this.offerEditDetails?.price,
      validFrom: this.offerEditDetails?.validFrom,
      validTo: this.offerEditDetails?.validTo,
    });
  }

  offerDetails(id) {
    this.getOfferDetailsSubcription = this.offerService
      .getOfferDetails(id)
      .subscribe(
        (response) => {
          if (response) {
            this.offerEditDetails = response;
            this.setFormValues();
          }
        },
        (error) => {
          this.toastr.error("", error.error.message);
        }
      );
  }

  fromDateChanged(event) {
    this.minToDate = event?.value;
  }

  goBack() {
    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}/${RoutePathConfig?.offer}`;
    this.router.navigate([path]);
  }
}
