import { SharedModule } from "src/app/shared/shared-module";
import { SubscriptionRoutingModule } from "./subscription-routing.module";
import { NgModule } from "@angular/core";
import { SubscriptionComponent } from "./subscription.component";

const modules = [SharedModule, SubscriptionRoutingModule];

const components = [SubscriptionComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class SubscriptionModule { }
