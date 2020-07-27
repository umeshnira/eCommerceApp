import { CouponsComponent } from "./coupons.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";


const couponRoutes = [
    {
        path: '',
        component: CouponsComponent
    },
 
];

@NgModule({
    imports: [RouterModule.forChild(couponRoutes)],
    exports: [RouterModule]
})

export class CouponRoutingModule { }
