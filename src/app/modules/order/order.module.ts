import { NgModule } from '@angular/core';
import { OrderComponent } from './components/order/orders.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from 'src/app/shared/shared-module';

const modules = [OrderRoutingModule, SharedModule];

const components = [OrderComponent];

const providers = [];

@NgModule({
    imports: modules,
    declarations: components,
    providers
})

export class OrderModule { }
