import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionComponent } from './subscription.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
const subscriptionRoutes = [
    {
        path: '',
        component: SubscriptionComponent
    },
    {
        path: 'add',
        component: AddSubscriptionComponent
    },
    {
        path: 'edit/:id',
        component: AddSubscriptionComponent
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
