import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrderComponent } from './components/order/orders.component';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

const routes = [
    {
        path: '',
        component: OrderComponent
    },
    {
        path: 'create',
        component: OrderPlacedComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class OrderRoutingModule { }
