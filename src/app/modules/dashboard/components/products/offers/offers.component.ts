import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { RoutePathConfig } from 'src/app/core/config/route-path-config';
import { OfferService } from '../services/offer.service';
import { ToastrService } from 'ngx-toastr';
import { SubscriptionLike as ISubscription } from 'rxjs';
import { OfferModel } from 'src/app/modules/home/modules/product/models/offer.model';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit, AfterViewInit, OnDestroy {

  offerList: OfferModel;
  getAllOffersSubscription: ISubscription;

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

  private loadScript(scriptUrl: string) {
    return new Promise((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    });
  }

  ngOnDestroy() {
    if (this.getAllOffersSubscription) {
      this.getAllOffersSubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.loadScript('assets/js/datatable.js');
  }

  private getAllOffers() {
    this.getAllOffersSubscription = this.offerService.getAllOffers().subscribe(response => {

      if (response) {
        this.offerList = response;
      }
    },
      (error) => {
        this.toastr.error('', error.error.message);
      }
    );
  }
}

