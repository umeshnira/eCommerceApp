import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { OfferService } from '../services/offer.service';
import { ToastrService } from 'ngx-toastr';
import { Subject, SubscriptionLike as ISubscription } from 'rxjs';
import { OfferModel } from 'src/app/modules/home/modules/product/models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, OnDestroy {

  offerList: OfferModel[];
  getAllOffersSubscription: ISubscription;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();
  
  constructor(
    private router: Router,
    private offerService: OfferService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getAllOffers();
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
    this.getAllOffersSubscription = this.offerService.getAllOffers().subscribe(response => {

      if (response) {
        this.offerList = response;
        this.dtTrigger.next();
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }
}

