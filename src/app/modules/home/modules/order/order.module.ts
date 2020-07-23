import { NgModule } from '@angular/core';
import { OrderComponent } from './components/order/orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';
import { OrderPlacedComponent } from './components/order-placed/order-placed.component';
import{OrderReturnComponent}from './components/order-return/order-return.component'

const modules = [OrderRoutingModule, SharedModule];

const components = [OrderComponent, OrderPlacedComponent,OrderReturnComponent];

const providers = [];

@NgModule({
    imports: [modules],
    declarations: [components],
    providers
})

export class OrderModule { }
