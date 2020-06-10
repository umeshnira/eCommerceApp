import { NgModule } from '@angular/core';
import { DeliveryOptionsComponent } from './components/delivery-options/delivery-options.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { SharedModule } from 'src/app/shared/shared-module';
import { PaymentRoutingModule } from './payment-routing.module';

const modules = [PaymentRoutingModule, SharedModule];

const components = [DeliveryOptionsComponent, OrderPlacedComponent, PaymentComponent, PaymentMethodComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class PaymentModule { }
