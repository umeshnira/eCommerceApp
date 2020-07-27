import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SellerComponent } from './seller.component';
import { SellerSubscriptionComponent } from './seller-subscription/seller-subscription.component';
import { DashboardSellerRegistrationComponent } from './dashboard-seller-registration/dashboard-seller-registration.component';


const sellerRoutes = [
    {
        path: '',
        component: SellerComponent
    },
    {
        path: 'seller-registration',
        component: DashboardSellerRegistrationComponent
    },
    {
        path: 'seller-subscription',
        component: SellerSubscriptionComponent
    },

];

@NgModule({
    imports: [RouterModule.forChild(sellerRoutes)],
    exports: [RouterModule]
})

export class SellerRoutingModule { }
