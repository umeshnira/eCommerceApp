import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DeliveryOptionsComponent } from './components/delivery-options/delivery-options.component';
import { PaymentComponent } from './components/payment/payment.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';

const routes = [
    {
        path: '',
        component: PaymentComponent
    },
    {
        path: 'delivery',
        component: DeliveryOptionsComponent
    },
    {
        path: 'method',
        component: PaymentMethodComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PaymentRoutingModule { }
