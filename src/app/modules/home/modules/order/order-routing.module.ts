import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/orders.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import { OrderReturnComponent } from './components/order-return/order-return.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule { }
