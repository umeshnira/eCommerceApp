import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared-module';
import { SellerRoutingModule } from './seller-routing.module';
import { SellerSubscriptionComponent } from './seller-subscription/seller-subscription.component';
import { SellerComponent } from './seller.component';
import { DashboardSellerRegistrationComponent } from './dashboard-seller-registration/dashboard-seller-registration.component';
import { SellerService } from './services/seller.service';

const modules = [SharedModule, SellerRoutingModule ];

const components = [SellerSubscriptionComponent, SellerComponent, DashboardSellerRegistrationComponent];

const providers = [SellerService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class SellerModule { }
