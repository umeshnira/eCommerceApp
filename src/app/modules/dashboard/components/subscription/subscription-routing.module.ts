import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SubscriptionComponent } from "./subscription.component";
const subscriptionRoutes = [
    {
        path: '',
        component: SubscriptionComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(subscriptionRoutes)],
    exports: [RouterModule]
})

export class SubscriptionRoutingModule { }
