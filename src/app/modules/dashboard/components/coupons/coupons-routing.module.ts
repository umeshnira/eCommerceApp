import { CouponsComponent } from "./coupons.component";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AddEditCouponComponent } from "./add-edit-coupon/add-edit-coupon.component";


const couponRoutes = [
    {
        path: '',
        component: CouponsComponent
    },
    {
        path: 'add-coupons',
        component: AddEditCouponComponent
    },
    {
        path: 'edit-coupons',
        component: AddEditCouponComponent
    },
 
];

@NgModule({
    imports: [RouterModule.forChild(couponRoutes)],
    exports: [RouterModule]
})

export class CouponRoutingModule { }
