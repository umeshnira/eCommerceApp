import { NgModule } from '@angular/core';
import { OrderComponent } from './components/order/orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';

const modules = [OrderRoutingModule, SharedModule];

const components = [OrderComponent, OrderPlacedComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class OrderModule { }
