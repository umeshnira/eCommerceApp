import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
const subscriptionRoutes = [
    {
        path: '',
        component: SubscriptionComponent
    },
    {
        path: 'subscribers',
        component: ViewSubscriberComponent
    },
    {
        path: 'seller-details',
        component: SellerDetailsComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(subscriptionRoutes)],
    exports: [RouterModule]
})

export class SubscriptionRoutingModule { }
