import { NgModule } from '@angular/core';
import { CouponRoutingModule } from './coupons-routing.module';
import { CouponsComponent } from './coupons.component';
import { SharedModule } from 'src/app/shared/shared-module';
const modules = [SharedModule, CouponRoutingModule];

const components = [CouponsComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class CouponModule { }
