import { SharedModule } from 'src/app/shared/shared-module';
import { SubscriptionRoutingModule } from './subscription-routing.module';
import { NgModule } from '@angular/core';
import { SubscriptionComponent } from './subscription.component';
import { ViewSubscriberComponent } from './view-subscriber/view-subscriber.component';
import { SellerDetailsComponent } from './seller-details/seller-details.component';
import { AddSubscriptionComponent } from './add-subscription/add-subscription.component';
import { SubcriptionService } from './service/subcription.service';

const modules = [SharedModule, SubscriptionRoutingModule];

const components = [SubscriptionComponent, ViewSubscriberComponent, SellerDetailsComponent, AddSubscriptionComponent];

const providers = [SubcriptionService];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class SubscriptionModule { }
