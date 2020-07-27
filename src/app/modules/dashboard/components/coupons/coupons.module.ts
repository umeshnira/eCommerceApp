import { NgModule } from '@angular/core';
import { CouponRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { AddEditCouponComponent } from './add-edit-coupon/add-edit-coupon.component';
const modules = [SharedModule, CouponRoutingModule];

const components = [CouponsComponent,AddEditCouponComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class CouponModule { }
