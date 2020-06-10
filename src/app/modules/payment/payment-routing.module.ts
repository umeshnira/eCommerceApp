import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeliveryOptionsComponent } from './components/delivery-options/delivery-options.component';
import { PaymentComponent } from './components/payment/payment.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';

const routes = [
    {
        path: '',
        component: PaymentComponent
    },
    {
        path: 'delivery-options',
        component: DeliveryOptionsComponent
    },
    {
        path: 'order-placement',
        component: OrderPlacedComponent
    },
    {
        path: 'payment-method',
        component: PaymentMethodComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PaymentRoutingModule {}
