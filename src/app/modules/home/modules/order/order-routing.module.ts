import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/orders.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { OrderReturnComponent } from './components/order-return/order-return.component';
import { OrderInvoiceComponent } from './components/order-invoice/order-invoice.component';

const routes = [
    {
        path: '',
        component: OrderComponent
    },
    {
        path: 'placed',
        component: OrderPlacedComponent
    },
    {
        path: 'return',
        component: OrderReturnComponent
    },
    {
        path: 'invoice-details',
        component: OrderInvoiceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule { }
