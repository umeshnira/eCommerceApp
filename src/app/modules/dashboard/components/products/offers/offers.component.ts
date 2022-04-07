import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  AfterViewInit,
} from "@angular/core";
import { NavigationExtras, Router } from "@angular/router";
import { RoutePathConfig } from "src/app/core/config/route-path-config";
import { OfferService } from "../services/offer.service";
import { ToastrService } from "ngx-toastr";
import { Subject, SubscriptionLike as ISubscription } from "rxjs";
import { OfferModel } from "src/app/modules/home/modules/product/models/offer.model";
import { CustomConfirmComponent } from "src/app/shared/components/custom-confirm/custom-confirm.component";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Constants } from "src/app/shared/models/constants";
import { Status } from "src/app/shared/enums/user-status.enum";
import { DataTableDirective } from "angular-datatables";

const config = {
  backdrop: true,
  ignoreBackdropClick: false,
};
@Component({
  selector: "app-offers",
  templateUrl: "./offers.component.html",
  styleUrls: ["./offers.component.css"],
})
export class OffersComponent implements OnInit, OnDestroy, AfterViewInit {
  offerList: OfferModel[];
  bsModalRef: BsModalRef;
  getAllOffersSubscription: ISubscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective;

  constructor(
    private router: Router,
    private offerService: OfferService,
    private modalService: BsModalService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllOffers();
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  navigateToProductList() {
    let navigationExtras: NavigationExtras;
    navigationExtras = {
      queryParams: { offerList: true },
    };

    const path = `${RoutePathConfig.Dashboard}/${RoutePathConfig.Products}`;
    this.router.navigate([path], navigationExtras);
  }

  ngOnDestroy() {
    if (this.getAllOffersSubscription) {
      this.getAllOffersSubscription.unsubscribe();
    }
    this.dtTrigger?.unsubscribe();
  }

  private getAllOffers() {
    this.getAllOffersSubscription = this.offerService.getAllOffers().subscribe(
      (response) => {
        if (response) {
          this.offerList = response;
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            // Destroy the table first
            dtInstance.destroy();
            // Call the dtTrigger to rerender again
            this.dtTrigger.next();
          });
        }
      },
      (error) => {
        this.toastr.error("", error.error.message);
      }
    );
  }

  deleteOffer(id) {
    this.bsModalRef = this.modalService.show(CustomConfirmComponent, config);
    this.bsModalRef.content.data = Constants?.offerDeleteText;
    this.bsModalRef.content.onClose.subscribe((result) => {
      this.bsModalRef.hide();
      if (result) {
        this.getAllOffersSubscription = this.offerService
          .statusChangeOffer(id, Status.InActive)
          .subscribe(
            (response) => {
              if (response) {
                this.getAllOffers();
              }
            },
            (error) => {
              this.toastr.error("", error.error.message);
            }
          );
      }
    });
  }
}
